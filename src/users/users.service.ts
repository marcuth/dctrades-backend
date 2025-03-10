import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { Prisma, User } from "@prisma/client"
import { omit } from "lodash"
import sharp from "sharp"

import { DiscordWebhookService } from "../discord-webhook/discord-webhook.service"
import { PrismaService } from "../prisma/prisma.service"
import messageHelper from "../helpers/message.helper"
import { ImgBBService } from "../imgbb/imgbb.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly discordWebhookService: DiscordWebhookService,
        private readonly imgBBService: ImgBBService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                firebaseUid: createUserDto.firebaseUid,
                username: createUserDto.username,
                profile: {
                    create: {
                        name: createUserDto.name,
                        avatar: {
                            create: {
                                url: createUserDto.avatarUrl,
                            },
                        },
                    },
                },
            },
            include: {
                profile: true,
                preferences: true,
            },
        })

        this.discordWebhookService.safeNotify({
            type: "success",
            nameSuffix: "Creation",
            title: `User Created: ${user.profile.name}`,
            message: `\`\`\`json\n${JSON.stringify({ id: user.id, name: user.profile.name, email: user.email }, null, 4)}\`\`\``,
        })

        return user
    }

    async findOne(id: string, includeSensitiveInfo: boolean = false) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: id,
            },
            include: {
                profile: true,
                ...(includeSensitiveInfo && {
                    preferences: true,
                }),
            },
        })

        if (!user) {
            throw new NotFoundException(
                messageHelper.OBJECT_NOT_FOUND({
                    name: "User",
                    propertyValue: id,
                }),
            )
        }

        return user
    }

    async findOneByEmail(email: string, includeSensitiveInfo: boolean = false) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
            include: {
                profile: true,
                contacts: true,
                ...(includeSensitiveInfo && {
                    preferences: true,
                }),
            },
        })

        if (!user) {
            throw new NotFoundException(
                messageHelper.OBJECT_NOT_FOUND({
                    name: "User",
                    propertyValue: user.email,
                    property: "email",
                }),
            )
        }

        return user
    }

    async findOneByFirebaseUid(firebaseUid: string, includeSensitiveInfo: boolean = false) {
        const user = await this.prisma.user.findFirst({
            where: {
                firebaseUid: firebaseUid,
            },
            include: {
                profile: true,
                contacts: true,
                ...(includeSensitiveInfo && {
                    preferences: true,
                }),
            },
        })

        if (!user) {
            throw new NotFoundException(
                messageHelper.OBJECT_NOT_FOUND({
                    name: "User",
                    propertyValue: user.firebaseUid,
                    property: "firebaseUid",
                }),
            )
        }

        return user
    }

    async findOneByUsername(username: string, includeSensitiveInfo: boolean = false) {
        const user = await this.prisma.user.findFirst({
            where: { username: username },
            include: {
                profile: true,
                contacts: true,
                ...(includeSensitiveInfo && {
                    preferences: true,
                }),
            },
        })

        if (!user) {
            throw new NotFoundException(
                messageHelper.OBJECT_NOT_FOUND({
                    name: "User",
                    propertyValue: user.username,
                    property: "username",
                }),
            )
        }

        return omit(user, ["password"])
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        let avatarUrl: string | undefined

        if (updateUserDto.avatar) {
            const avatarFile = updateUserDto.avatar

            if (!avatarFile.mimetype.startsWith("image/")) {
                throw new BadRequestException(messageHelper.FILE_IS_NOT_IMAGE)
            }

            const metadata = await sharp(avatarFile.buffer).metadata()

            if (metadata.width !== metadata.height) {
                throw new BadRequestException(messageHelper.NON_PROPORTIONAL_IMAGE)
            }

            const resizedImage = await sharp(avatarFile.buffer).resize(500, 500).jpeg({ quality: 90 }).toBuffer()

            avatarUrl = await this.imgBBService.uploadImage(resizedImage)
        }

        const user = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: updateUserDto.username,
                profile: {
                    update: {
                        name: updateUserDto.name,
                        biography: updateUserDto.biography,
                        avatar: avatarUrl
                            ? {
                                  update: {
                                      url: avatarUrl,
                                  },
                              }
                            : undefined,
                    },
                },
                contacts: {
                    deleteMany: {},
                    createMany: {
                        data: updateUserDto.contacts.map((contact) => {
                            return {
                                type: contact.type,
                                attributes: contact.attributes as unknown as Prisma.JsonObject,
                            }
                        }),
                    },
                },
            },
            include: {
                profile: {
                    include: {
                        avatar: true,
                    },
                },
                contacts: true,
                preferences: true,
            },
        })

        return user
    }
}

import { Injectable, NotFoundException } from "@nestjs/common"
import { User } from "@prisma/client"

import { DiscordWebhookService } from "../discord-webhook/discord-webhook.service"
import { PrismaService } from "../prisma/prisma.service"
import messageHelper from "../helpers/message.helper"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly discordWebhookService: DiscordWebhookService,
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
                        biography: createUserDto.biography,
                    },
                },
            },
            include: {
                profile: true,
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

    async findByEmail(email: string, includeSensitiveInfo: boolean = false): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: { email: email },
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
                    propertyValue: user.email,
                    property: "email",
                }),
            )
        }

        return user
    }

    async findOneByFirebaseUid(firebaseUid: string, includeSensitiveInfo: boolean = false): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: { firebaseUid: firebaseUid },
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

        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return
    }
}

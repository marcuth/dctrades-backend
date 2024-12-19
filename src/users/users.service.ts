import { Injectable, NotFoundException } from "@nestjs/common"

import { User } from "@prisma/client"

import { PrismaService } from "../prisma/prisma.service"
import messageHelper from "src/helpers/message.helper"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return "This action adds a new user"
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
            throw new NotFoundException(messageHelper.OBJECT_NOT_FOUND("User", id))
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
            throw new NotFoundException(messageHelper.OBJECT_NOT_FOUND("User", `email: ${email}`))
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
            throw new NotFoundException(messageHelper.OBJECT_NOT_FOUND("User", `firebaseId: ${firebaseUid}`))
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
            throw new NotFoundException(messageHelper.OBJECT_NOT_FOUND("User", `Username: ${username}`))
        }

        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }
}

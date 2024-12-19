import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { User } from "@prisma/client"

import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase"

import * as admin from "firebase-admin"

import { LoginOrRegisterDto } from "./dtos/login-or-register.dto"
import generateUsername from "../utils/generate-username.util"
import messageHelper from "../helpers/message.helper"
import { UsersService } from "../users/users.service"

@Injectable()
export class AuthService {
    private readonly firebaseAuth: admin.auth.Auth

    constructor(
        @InjectFirebaseAdmin() firebaseAdmin: FirebaseAdmin,
        private readonly usersService: UsersService,
    ) {
        this.firebaseAuth = firebaseAdmin.auth
    }

    async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
        try {
            return await this.firebaseAuth.verifyIdToken(token)
        } catch (error) {
            throw new UnauthorizedException(messageHelper.INVALID_FIREBASE_AUTH_TOKEN)
        }
    }

    async registerOrLoginWithFirebase(loginOrRegisterDto: LoginOrRegisterDto) {
        const { uid, email, name, picture: avatarUrl } = await this.verifyToken(loginOrRegisterDto.token)

        let user: User

        try {
            user = await this.usersService.findOneByFirebaseUid(uid)
        } catch (error: any) {
            if (!(error instanceof NotFoundException)) {
                throw error
            }

            const generatedUsername = generateUsername(name ?? loginOrRegisterDto.name ?? "user")

            user = await this.usersService.create({
                firebaseUid: uid,
                email: email,
                name: name ?? loginOrRegisterDto.name ?? "Unknown User",
                avatarUrl: avatarUrl,
                username: generatedUsername,
            })
        }

        return user
    }
}

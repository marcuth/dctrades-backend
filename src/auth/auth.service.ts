import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase"
import * as admin from "firebase-admin"
import { User } from "@prisma/client"

import { SignUpWithFirebaseDto } from "./dtos/signup-with-firebase.dto"
import { SignInWithFirebaseDto } from "./dtos/signin-with-firebase.dto"
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

    async signInWithFirebase(loginWithFirebaseDto: SignInWithFirebaseDto) {
        const { uid: firebaseUid } = await this.verifyToken(loginWithFirebaseDto.token)

        let user: User

        try {
            user = await this.usersService.findOneByFirebaseUid(firebaseUid)
        } catch (error: any) {
            throw new UnauthorizedException(
                messageHelper.OBJECT_NOT_FOUND({
                    name: "User",
                    property: "firebaseUid",
                    propertyValue: firebaseUid
                })
            )
        }

        return user
    }

    async registerWithFirebase(signUpWithFirebaseDto: SignUpWithFirebaseDto) {
        const { uid, email, name, picture: avatarUrl } = await this.verifyToken(signUpWithFirebaseDto.token)

        let user: User

        try {
            user = await this.usersService.findOneByFirebaseUid(uid)
        } catch (error: any) {
            if (!(error instanceof NotFoundException)) {
                throw error
            }

            const userName = name ?? signUpWithFirebaseDto.name ?? "Unknown User"
            const generatedUsername = generateUsername(userName)

            user = await this.usersService.create({
                firebaseUid: uid,
                email: email,
                name: userName,
                avatarUrl: avatarUrl,
                username: generatedUsername,
            })
        }

        return user
    }
}

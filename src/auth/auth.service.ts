import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase"
import { JwtService } from "@nestjs/jwt"
import * as admin from "firebase-admin"
import { User } from "@prisma/client"
import * as bcrypt from "bcrypt"

import { isEmail } from "class-validator"

import { SignUpWithFirebaseDto } from "./dtos/signup-with-firebase.dto"
import { SignInWithFirebaseDto } from "./dtos/signin-with-firebase.dto"
import generateUsername from "../utils/generate-username.util"
import messageHelper from "../helpers/message.helper"
import { UsersService } from "../users/users.service"
import { SignUpDto } from "./dtos/signup.dto"

@Injectable()
export class AuthService {
    private readonly firebaseAuth: admin.auth.Auth

    constructor(
        @InjectFirebaseAdmin() firebaseAdmin: FirebaseAdmin,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
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

    async validateUser(usernameOrEmail: string, password: string) {
        let user: User

        try {
            if (isEmail(usernameOrEmail)) {
                user = await this.usersService.findOneByEmail(usernameOrEmail)
            } else {
                user = await this.usersService.findOneByUsername(usernameOrEmail)
            }
        } catch (error) {
            return null
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return null
        }

        const { password: _, ...rest } = user

        return rest
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
                    propertyValue: firebaseUid,
                }),
            )
        }

        return user
    }

    async signUpWithFirebase(signUpWithFirebaseDto: SignUpWithFirebaseDto) {
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

    async signUp(signUpDto: SignUpDto) {
        await this.usersService.create({
            name: signUpDto.name,
            username: signUpDto.username,
            email: signUpDto.email,
        })
    }

    async signIn(user: Omit<User, "password">) {
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }

        return {
            token: this.jwtService.sign(payload),
        }
    }
}

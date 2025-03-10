import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Injectable } from "@nestjs/common"

import { UsersService } from "../../users/users.service"
import { AuthService } from "../auth.service"

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, "firebase") {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_PRIVATE_KEY,
            ignoreExpiration: false,
        })
    }

    async validate(token: string) {
        const decodedToken = await this.authService.verifyToken(token)
        const user = await this.usersService.findOneByFirebaseUid(decodedToken.uid)

        return {
            id: user.id,
            firebaseUid: user.firebaseUid,
            email: user.email,
            username: user.username,
            role: user.role,
        }
    }
}

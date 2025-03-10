import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Injectable } from "@nestjs/common"
import { User } from "@prisma/client"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_PRIVATE_KEY,
        })
    }

    validate(payload: any) {
        return {
            id: payload.sub,
            email: payload.email,
            username: payload.username,
            role: payload.role,
        }
    }
}

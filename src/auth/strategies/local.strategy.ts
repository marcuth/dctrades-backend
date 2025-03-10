import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"

import { Injectable, UnauthorizedException } from "@nestjs/common"

import messagesHelper from "../../helpers/message.helper"
import { AuthService } from "../auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: "usernameOrEmail" })
    }

    async validate(usernameOrEmail: string, password: string) {
        const user = await this.authService.validateUser(usernameOrEmail, password)

        if (!user) {
            throw new UnauthorizedException(messagesHelper.EMAIL_OR_USERNAME_OR_PASSWORD_IS_NOT_VALID)
        }

        return user
    }
}

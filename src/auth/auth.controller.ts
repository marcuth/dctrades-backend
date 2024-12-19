import { Body, Controller, Post } from "@nestjs/common"

import { LoginOrRegisterDto } from "./dtos/login-or-register.dto"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register-or-login/firebase")
    async registerOrLoginWithFirebase(@Body() loginOrRegisterDto: LoginOrRegisterDto) {
        return await this.authService.registerOrLoginWithFirebase(loginOrRegisterDto)
    }
}

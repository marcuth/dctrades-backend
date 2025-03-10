import { Body, Controller, Post } from "@nestjs/common"

import { SignInWithFirebaseDto } from "./dtos/signin-with-firebase.dto"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signin/firebase")
    async signInWithFirebase(@Body() loginOrRegisterDto: SignInWithFirebaseDto) {
        return await this.authService.signInWithFirebase(loginOrRegisterDto)
    }
}

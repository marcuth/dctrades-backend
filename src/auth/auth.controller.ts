import { Body, Controller, Post, Req } from "@nestjs/common"

import { LocalAuthenticatedRequest } from "./interface/local-authenticated-request.interface"
import { SignUpWithFirebaseDto } from "./dtos/signup-with-firebase.dto"
import { SignInWithFirebaseDto } from "./dtos/signin-with-firebase.dto"
import { SignUpDto } from "./dtos/signup.dto"
import { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signin/firebase")
    async signInWithFirebase(@Body() singInWithFirebaseDto: SignInWithFirebaseDto) {
        return await this.authService.signInWithFirebase(singInWithFirebaseDto)
    }

    @Post("signup/firebase")
    async signUpWithFirebase(@Body() singUpWithFirebaseDto: SignUpWithFirebaseDto) {
        return await this.authService.signUpWithFirebase(singUpWithFirebaseDto)
    }

    @Post("signup")
    async signUp(@Body() siginUpDto: SignUpDto) {
        return await this.authService.signUp(siginUpDto)
    }

    @Post("signin")
    async signIn(@Req() req: LocalAuthenticatedRequest) {
        return await this.authService.signIn(req.user)
    }
}

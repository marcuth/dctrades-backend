import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from "@nestjs/common"

import messageHelper from "../../helpers/message.helper"
import { UsersService } from "../../users/users.service"
import { AuthService } from "../auth.service"

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException(messageHelper.REQUEST_WITHOUT_AUTHORIZATION_TOKEN)
        }

        return await this.validateTokenFlow(token, request)
    }

    protected async validateTokenFlow(token: string, request: any): Promise<boolean> {
        try {
            const decodedToken = await this.authService.verifyToken(token)
            const user = await this.usersService.findOneByFirebaseUid(decodedToken.uid, true)

            request.user = user

            return true
        } catch (error) {
            Logger.error("Firebase Auth Token" + error)

            throw new UnauthorizedException(messageHelper.INVALID_AUTHORIZATION_TOKEN)
        }
    }

    protected extractTokenFromHeader(request: any): string | null {
        const authHeader = request.headers.authorization

        if (authHeader && authHeader.startsWith("Bearer ")) {
            return authHeader.split(" ")[1]
        }

        return null
    }
}

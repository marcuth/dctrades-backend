import { Injectable, ExecutionContext } from "@nestjs/common"

import { AuthGuard } from "./auth.guard"

@Injectable()
export class OptionalAuthGuard extends AuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            request.user = null
            return true
        }

        try {
            await this.validateTokenFlow(token, request)
        } catch (error) {
            request.user = null
        }

        return true
    }
}

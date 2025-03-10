import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserRole } from "@prisma/client"
import { Reflector } from "@nestjs/core"

import { FirebaseAuthenticatedRequest } from "../interface/firebase-authenticated-request.interface"
import { JwtAuthenticatedRequest } from "../interface/jwt-authenticated-request.interface"
import { ROLES_KEY } from "../decorators/roles.decorator"
import messageHelper from "../../helpers/message.helper"

export type AuthenticatedRequest = FirebaseAuthenticatedRequest | JwtAuthenticatedRequest

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        const request = context.switchToHttp().getRequest() as AuthenticatedRequest

        if (!request.user) {
            throw new UnauthorizedException(messageHelper.UNAUTHORIZED_USER)
        }

        return requiredRoles.includes(request.user.role)
    }
}

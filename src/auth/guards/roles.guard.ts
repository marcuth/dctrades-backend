import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserRole } from "@prisma/client"
import { Reflector } from "@nestjs/core"

import { AuthenticatedRequest } from "../types/authenticated-request.type"
import { ROLES_KEY } from "../decorators/roles.decorator"
import messageHelper from "../../helpers/message.helper"

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

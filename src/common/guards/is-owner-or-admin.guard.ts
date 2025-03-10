import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { UserRole } from "@prisma/client"

import { ResourceService } from "../interfaces/resource-service.interface"
import { AuthenticatedRequest } from "../../auth/guards/roles.guard"
import messageHelper from "../../helpers/message.helper"
import { UsersService } from "../../users/users.service"
import { OwnershipGuard } from "./ownership.guard"

export class IsOnwnerOrAdminGuard<T> extends OwnershipGuard<T> implements CanActivate {
    constructor(resourceService: ResourceService<T>, ownerIdProperty: string) {
        super(resourceService, ownerIdProperty)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as AuthenticatedRequest

        if (!request.user) {
            throw new UnauthorizedException(messageHelper.UNAUTHORIZED_USER)
        }

        if (request.user.role === UserRole.ADMIN) {
            return true
        }

        return super.canActivate(context)
    }
}

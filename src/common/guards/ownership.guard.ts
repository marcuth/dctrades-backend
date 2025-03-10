import { ExecutionContext, ForbiddenException, Inject, UnauthorizedException } from "@nestjs/common"

import { FirebaseAuthenticatedUser } from "../../auth/interface/firebase-authenticated-request.interface"
import { JwtAuthenticatedUser } from "../../auth/interface/jwt-authenticated-request.interface"
import { ResourceService } from "../interfaces/resource-service.interface"
import messageHelper from "../../helpers/message.helper"

export type AuthenticatedUser = JwtAuthenticatedUser | FirebaseAuthenticatedUser

export class OwnershipGuard<T> {
    constructor(
        @Inject("RESOURCE_SERVICE") private readonly resourceService: ResourceService<T>,
        private readonly ownerIdProperty: string,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const user = request.user as AuthenticatedUser

        if (!user) {
            throw new UnauthorizedException(messageHelper.REQUEST_WITHOUT_AUTHORIZATION_TOKEN)
        }

        const resourceId = request.params?.id

        if (!resourceId) {
            throw new ForbiddenException("The resource ID was not provided in the request.")
        }

        const resource = await this.resourceService.findOne(resourceId)

        if (!resource) {
            throw new ForbiddenException("The requested resource was not found.")
        }

        if (resource[this.ownerIdProperty] !== user.id) {
            throw new ForbiddenException("You are not authorized to access this resource.")
        }

        return true
    }
}

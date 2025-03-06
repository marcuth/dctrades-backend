import { ExecutionContext, ForbiddenException, Inject, UnauthorizedException } from "@nestjs/common"
import { User } from "@prisma/client"

import { ResourceService } from "../interfaces/resource-service.interface"
import messageHelper from "../../helpers/message.helper"

export class OwnerShipGuard<T> {
    constructor(
        @Inject("RESOURCE_SERVICE") private readonly resourceService: ResourceService<T>,
        private readonly ownerIdProperty: string,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const user = request.user as User | undefined

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

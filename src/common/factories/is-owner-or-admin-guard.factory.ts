import { CanActivate, Inject, Injectable, Type } from "@nestjs/common"

import { ResourceService } from "../interfaces/resource-service.interface"
import { IsOnwnerOrAdminGuard } from "../guards/is-owner-or-admin.guard"

export function IsOwnerOrAdminGuardFactory<T>(ownerIdProperty: string): Type<CanActivate> {
    @Injectable()
    class InternalIsOwnerOrAdminGuard extends IsOnwnerOrAdminGuard<T> {
        constructor(@Inject("RESOURCE_SERVICE") resourceService: ResourceService<T>) {
            super(resourceService, ownerIdProperty)
        }
    }

    return InternalIsOwnerOrAdminGuard
}

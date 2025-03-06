import { CanActivate, Inject, Injectable, Type } from "@nestjs/common"

import { ResourceService } from "../interfaces/resource-service.interface"
import { OwnerShipGuard } from "../guards/ownership.guard"

export function OwnershipGuardFactory<T>(ownerIdProperty: string): Type<CanActivate> {
    @Injectable()
    class OwnershipGuard extends OwnerShipGuard<T> {
        constructor(@Inject("RESOURCE_SERVICE") resourceService: ResourceService<T>) {
            super(resourceService, ownerIdProperty)
        }
    }

    return OwnershipGuard
}

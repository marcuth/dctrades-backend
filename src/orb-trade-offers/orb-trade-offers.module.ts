import { Module } from "@nestjs/common"

import { OrbTradeOffersController } from "./orb-trade-offers.controller"
import { OrbTradeOffersService } from "./orb-trade-offers.service"
import { PrismaModule } from "../prisma/prisma.module"
import { UsersModule } from "../users/users.module"
import { AuthModule } from "../auth/auth.module"

@Module({
    imports: [PrismaModule, UsersModule, AuthModule],
    controllers: [OrbTradeOffersController],
    providers: [
        {
            provide: "RESOURCE_SERVICE",
            useClass: OrbTradeOffersService,
        },
        OrbTradeOffersService,
    ],
})
export class OrbTradeOffersModule {}

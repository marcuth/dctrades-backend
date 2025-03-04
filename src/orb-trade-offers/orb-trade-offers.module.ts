import { Module } from "@nestjs/common"

import { OrbTradeOffersController } from "./orb-trade-offers.controller"
import { OrbTradeOffersService } from "./orb-trade-offers.service"

@Module({
    controllers: [OrbTradeOffersController],
    providers: [OrbTradeOffersService],
})
export class OrbTradeOffersModule {}

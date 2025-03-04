import { PartialType } from "@nestjs/swagger"

import { CreateOrbTradeOfferDto } from "./create-orb-trade-offer.dto"

export class UpdateOrbTradeOfferDto extends PartialType(CreateOrbTradeOfferDto) {}

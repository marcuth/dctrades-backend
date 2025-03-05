import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from "@nestjs/common"

import { AuthenticatedRequest } from "../auth/types/authenticated-request.type"
import { CreateOrbTradeOfferDto } from "./dto/create-orb-trade-offer.dto"
import { UpdateOrbTradeOfferDto } from "./dto/update-orb-trade-offer.dto"
import { OrbTradeOffersService } from "./orb-trade-offers.service"
import { AuthGuard } from "../auth/guards/auth.guard"

@Controller("orb-trade-offers")
export class OrbTradeOffersController {
    constructor(private readonly orbTradeOffersService: OrbTradeOffersService) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createOrbTradeOfferDto: CreateOrbTradeOfferDto, @Req() req: AuthenticatedRequest) {
        return await this.orbTradeOffersService.create(createOrbTradeOfferDto)
    }

    @Get()
    async findAll(@Query("page") page: number = 1, @Query("perPage") perPage: number = 10) {
        return await this.orbTradeOffersService.findAll({
            page: page,
            perPage: perPage,
        })
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.orbTradeOffersService.findOne(id)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrbTradeOfferDto: UpdateOrbTradeOfferDto) {
        return this.orbTradeOffersService.update(id, updateOrbTradeOfferDto)
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.orbTradeOffersService.remove(id)
    }
}

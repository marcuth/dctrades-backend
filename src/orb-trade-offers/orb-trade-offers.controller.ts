import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from "@nestjs/common"

import { OwnershipGuardFactory } from "../common/factories/ownership-guard.factory"
import { AuthenticatedRequest } from "../auth/types/authenticated-request.type"
import { CreateOrbTradeOfferDto } from "./dto/create-orb-trade-offer.dto"
import { UpdateOrbTradeOfferDto } from "./dto/update-orb-trade-offer.dto"
import { OrbTradeOffersService } from "./orb-trade-offers.service"
import { AuthGuard } from "../auth/guards/auth.guard"
import configHelper from "src/helpers/config.helper"

@Controller("orb-trade-offers")
export class OrbTradeOffersController {
    constructor(private readonly orbTradeOffersService: OrbTradeOffersService) {}

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() createOrbTradeOfferDto: CreateOrbTradeOfferDto, @Req() req: AuthenticatedRequest) {
        return await this.orbTradeOffersService.create(createOrbTradeOfferDto)
    }

    @Get()
    async findAll(@Query("page") page: number = configHelper.orbTradeOffers.pagination.defaultPage, @Query("perPage") perPage: number = configHelper.orbTradeOffers.pagination.defaultPerPage) {
        return await this.orbTradeOffersService.findAll({
            page: Math.max(page, configHelper.orbTradeOffers.pagination.defaultPage),
            perPage: Math.min(perPage, configHelper.orbTradeOffers.pagination.maxPerPage),
        })
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return await this.orbTradeOffersService.findOne(id)
    }

    @Patch(":id")
    @UseGuards(AuthGuard, OwnershipGuardFactory("ownerId"))
    async update(@Param("id") id: string, @Body() updateOrbTradeOfferDto: UpdateOrbTradeOfferDto) {
        return await this.orbTradeOffersService.update(id, updateOrbTradeOfferDto)
    }

    @Delete(":id")
    @UseGuards(AuthGuard, OwnershipGuardFactory("ownerId"))
    async remove(@Param("id") id: string) {
        return await this.orbTradeOffersService.remove(id)
    }
}

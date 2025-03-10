import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ParseIntPipe } from "@nestjs/common"
import { OrbTradeOffer } from "@prisma/client"

import { FirebaseAuthenticatedRequest } from "../auth/interface/firebase-authenticated-request.interface"
import { IsOwnerOrAdminGuardFactory } from "../common/factories/is-owner-or-admin-guard.factory"
import { OwnershipGuardFactory } from "../common/factories/ownership-guard.factory"
import { UpdateOrbTradeOfferDto } from "./dto/update-orb-trade-offer.dto"
import { CreateOrbTradeOfferDto } from "./dto/create-orb-trade-offer.dto"
import { OrbTradeOffersService } from "./orb-trade-offers.service"
import { FirebaseAuthGuard } from "../auth/guards/firebase-auth.guard"
import configHelper from "../helpers/config.helper"

@Controller("orb-trade-offers")
export class OrbTradeOffersController {
    constructor(private readonly orbTradeOffersService: OrbTradeOffersService) {}

    @Post()
    @UseGuards(FirebaseAuthGuard)
    async create(@Body() createOrbTradeOfferDto: CreateOrbTradeOfferDto, @Req() req: FirebaseAuthenticatedRequest) {
        return await this.orbTradeOffersService.create({
            ...createOrbTradeOfferDto,
            ownerId: req.user.id,
        })
    }

    @Get()
    async findAll(
        @Query("page", ParseIntPipe) page: number = configHelper.orbTradeOffers.pagination.defaultPage,
        @Query("perPage", ParseIntPipe) perPage: number = configHelper.orbTradeOffers.pagination.defaultPerPage,
    ) {
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
    @UseGuards(FirebaseAuthGuard, OwnershipGuardFactory<OrbTradeOffer>("ownerId"))
    async update(@Param("id") id: string, @Body() updateOrbTradeOfferDto: UpdateOrbTradeOfferDto) {
        return await this.orbTradeOffersService.update(id, updateOrbTradeOfferDto)
    }

    @Delete(":id")
    @UseGuards(FirebaseAuthGuard, IsOwnerOrAdminGuardFactory<OrbTradeOffer>("ownerId"))
    async remove(@Param("id") id: string) {
        return await this.orbTradeOffersService.remove(id)
    }
}

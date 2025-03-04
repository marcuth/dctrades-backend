import { Injectable } from "@nestjs/common"

import { CreateOrbTradeOfferDto } from "./dto/create-orb-trade-offer.dto"
import { UpdateOrbTradeOfferDto } from "./dto/update-orb-trade-offer.dto"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class OrbTradeOffersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createOrbTradeOfferDto: CreateOrbTradeOfferDto) {
        return await this.prisma.orbTradeOffer.create({
            data: {
                quantity: createOrbTradeOfferDto.quantity,
                dragon: {
                    connect: {
                        id: createOrbTradeOfferDto.dragonId,
                    },
                },
                offeredItems: {
                    createMany: {
                        data: createOrbTradeOfferDto,
                    },
                },
                owner: {
                    connect: {
                        id: createOrbTradeOfferDto.ownerId,
                    },
                },
            },
        })
    }

    async findAll() {
        return `This action returns all orbTradeOffers`
    }

    async findOne(id: number) {
        return `This action returns a #${id} orbTradeOffer`
    }

    async update(id: number, updateOrbTradeOfferDto: UpdateOrbTradeOfferDto) {
        return `This action updates a #${id} orbTradeOffer`
    }

    async remove(id: number) {
        return `This action removes a #${id} orbTradeOffer`
    }
}

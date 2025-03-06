import { Injectable, NotFoundException } from "@nestjs/common"

import { createPaginator, PaginateOptions } from "prisma-pagination"
import { Prisma } from "@prisma/client"


import { UpdateOrbTradeOfferDto } from "./dto/update-orb-trade-offer.dto"
import { OrbTradeOfferDto } from "./dto/orb-trade-offer.dto"
import { PrismaService } from "../prisma/prisma.service"
import messageHelper from "../helpers/message.helper"
import { CreateOrbTradeOfferInternalDto } from "./dto/create-orb-trade-offer-internal.dto"

@Injectable()
export class OrbTradeOffersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createOrbTradeOfferDto: CreateOrbTradeOfferInternalDto) {
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

    async findAll({ page, perPage }: PaginateOptions) {
        const paginate = createPaginator({ perPage: perPage })

        return paginate<OrbTradeOfferDto, Prisma.OrbTradeOfferFindManyArgs>(
            this.prisma.orbTradeOffer,
            {
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    dragon: true,
                    offeredItems: true,
                    owner: {
                        include: {
                            profile: true,
                        },
                    },
                },
            },
            {
                page: page,
            },
        )
    }

    async findOne(id: string) {
        const orbTradeOffer = await this.prisma.orbTradeOffer.findFirst({
            where: {
                id: id,
            },
        })

        if (!orbTradeOffer) {
            throw new NotFoundException(
                messageHelper.OBJECT_NOT_FOUND({
                    name: "OrbTradeOffer",
                    propertyValue: id,
                }),
            )
        }

        return orbTradeOffer
    }

    async update(id: string, data: UpdateOrbTradeOfferDto) {
        return await this.prisma.orbTradeOffer.update({
            where: {
                id: id,
            },
            data: {
                quantity: data.quantity,
                dragonId: data.dragonId,
                offeredItems: data.offeredItems
                    ? {
                          deleteMany: {},
                          create: data.offeredItems.map((item) => ({
                              dragonId: item.dragonId,
                              quantity: item.quantity,
                          })),
                      }
                    : undefined,
            },
            include: {
                offeredItems: true,
                dragon: true,
                owner: {
                    include: {
                        profile: true,
                    },
                },
            },
        })
    }

    async remove(id: string) {
        return await this.prisma.orbTradeOffer.delete({
            where: { id: id },
        })
    }
}

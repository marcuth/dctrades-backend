import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, Max, Min, ValidateNested } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

import { CreateOfferedItemDto } from "./create-orb-trade-offer.dto"
import configHelper from "../../helpers/config.helper"

export class UpdateOrbTradeOfferDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity?: number

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(configHelper.dragons.minDragonId)
    @Max(configHelper.dragons.maxDragonId)
    dragonId?: number

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOfferedItemDto)
    offeredItems?: CreateOfferedItemDto[]
}

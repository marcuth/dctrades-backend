import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, Max, Min, ValidateNested } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

import { OfferedItemDto } from "./create-orb-trade-offer.dto"
import configHelper from "../../helpers/config.helper"

export class UpdateOrbTradeOfferDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity?: number

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(configHelper.dragons.minDragonId)
    @Max(configHelper.dragons.maxDragonId)
    dragonId?: number

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OfferedItemDto)
    offeredItems?: OfferedItemDto[]
}

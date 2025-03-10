import { IsArray, IsInt, IsNumber, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

import configHelper from "../../helpers/config.helper"

export class CreateOfferedItemDto {
    @ApiProperty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(configHelper.dragons.minDragonId)
    @Max(configHelper.dragons.maxDragonId)
    dragonId: number

    @ApiProperty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity: number
}

export class CreateOrbTradeOfferDto {
    @ApiProperty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity: number

    @ApiProperty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(configHelper.dragons.minDragonId)
    @Max(configHelper.dragons.maxDragonId)
    dragonId: number

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOfferedItemDto)
    offeredItems: CreateOfferedItemDto[]
}

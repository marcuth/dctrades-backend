import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, Max, Min, ValidateNested } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

import { OfferedItemDto } from "./create-orb-trade-offer.dto"

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
    @Min(1000)
    @Max(9999)
    dragonId?: number

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OfferedItemDto)
    offeredItems?: OfferedItemDto[]
}

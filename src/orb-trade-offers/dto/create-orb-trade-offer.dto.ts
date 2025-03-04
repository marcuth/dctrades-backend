import { IsArray, IsInt, IsNumber, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

export class OfferedItemDto {
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(1000)
    @Max(9999)
    dragonId: number

    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity: number
}

export class CreateOrbTradeOfferDto {
    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity: number

    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(1000)
    @Max(9999)
    dragonId: number

    @IsString()
    @IsUUID()
    ownerId: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OfferedItemDto)
    offeredItems: OfferedItemDto[]
}

import { IsArray, IsInt, IsNumber, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class OfferedItemDto {
    @ApiProperty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    @Min(1000)
    @Max(9999)
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
    @Min(1000)
    @Max(9999)
    dragonId: number

    @ApiProperty()
    @IsString()
    @IsUUID()
    ownerId: string

    @ApiProperty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OfferedItemDto)
    offeredItems: OfferedItemDto[]
}

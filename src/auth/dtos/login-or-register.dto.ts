import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginOrRegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string
}

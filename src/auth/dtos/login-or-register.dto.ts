import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginOrRegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string
}

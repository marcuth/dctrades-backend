import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

import regexHelper from "../../helpers/regex.helper"

export class CreateUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    firebaseUid?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @Matches(regexHelper.username)
    username: string

    @ApiProperty()
    @IsOptional()
    @IsUrl()
    avatarUrl?: string
}

import { ApiProperty } from "@nestjs/swagger"

import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

import configHelper from "../../helpers/config.helper"
import regexHelper from "../../helpers/regex.helper"

export class SignUpDto {
    @ApiProperty()
    @IsString()
    @MinLength(configHelper.users.minNameLength)
    @MaxLength(configHelper.users.maxNameLength)
    name: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @Matches(regexHelper.username)
    username: string
}

import { IsOptional, IsString, IsUrl, Matches } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

import regexHelper from "../../helpers/regex.helper"

export class UpdateUserDto {
    @IsOptional()
    @ApiProperty()
    @IsString()
    name?: string

    @IsOptional()
    @ApiProperty()
    @IsString()
    @Matches(regexHelper.username)
    username?: string

    @IsOptional()
    @ApiProperty()
    @IsOptional()
    @IsUrl()
    avatarUrl?: string
}

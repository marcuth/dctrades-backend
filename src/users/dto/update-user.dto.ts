import { IsOptional, IsString, Matches } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

import regexHelper from "../../helpers/regex.helper"

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Matches(regexHelper.username)
    username?: string
}

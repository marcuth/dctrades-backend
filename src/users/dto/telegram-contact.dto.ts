import { IsString, Matches } from "class-validator"

import { ApiProperty } from "@nestjs/swagger"

import regexHelper from "../../helpers/regex.helper"

export class TelegramContactDto {
    @ApiProperty()
    @IsString()
    @Matches(regexHelper.telegramUsername)
    telegramUsername: string
}

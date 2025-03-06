import { IsString, Matches } from "class-validator"

import { ApiProperty } from "@nestjs/swagger"

import regexHelper from "../../helpers/regex.helper"

export class DiscordContactDto {
    @ApiProperty()
    @IsString()
    @Matches(regexHelper.discordUserId)
    discordUserId: string

    @ApiProperty()
    @IsString()
    @Matches(regexHelper.discordUsername)
    discordUsername: string
}

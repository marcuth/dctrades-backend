import { IsEnum, IsObject, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

import { ApiProperty } from "@nestjs/swagger"

import { TelegramContactDto } from "./telegram-contact.dto"
import { WhatsAppContactDto } from "./whatsapp-contact.dto"
import { DiscordContactDto } from "./discord-contact.dto"
import configHelper from "../../helpers/config.helper"
import { EmailContactDto } from "./email-contact.dto"

export class CreateContactDto {
    @ApiProperty()
    @IsEnum(configHelper.contacts.allowedTypes)
    type: string

    @ApiProperty()
    @IsObject()
    @ValidateNested()
    @Type((obj: Record<string, any>) => {
        const contactType = obj.value.type as string

        switch (contactType) {
            case "email":
                return EmailContactDto
            case "whatsapp":
                return WhatsAppContactDto
            case "discord":
                return DiscordContactDto
            case "telegram":
                return TelegramContactDto
            default:
                throw new Error(`Invalid contact type: ${contactType}`)
        }
    })
    attributes: DiscordContactDto | TelegramContactDto
}

import { IsArray, IsEnum, IsOptional, IsString, Matches, ValidateNested } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

import { CreateContactDto } from "./create-contact.dto"
import configHelper from "../../helpers/config.helper"
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

    @ApiProperty()
    @IsOptional()
    @IsString()
    biography?: string

    @ApiProperty({ type: "string", format: "binary" })
    @IsOptional()
    avatar?: Express.Multer.File

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateContactDto)
    contacts?: CreateContactDto[]

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsEnum(configHelper.users.allowedLanguages)
    language?: string
}

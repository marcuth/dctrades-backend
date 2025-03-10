import { IsArray, IsEnum, IsOptional, IsString, Matches, ValidateNested } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

import { Language } from "@prisma/client"

import { CreateContactDto } from "./create-contact.dto"
import regexHelper from "../../helpers/regex.helper"

export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @Matches(regexHelper.username)
    username?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    biography?: string

    @ApiProperty({ type: "string", format: "binary", required: false })
    @IsOptional()
    avatar?: Express.Multer.File

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateContactDto)
    contacts?: CreateContactDto[]

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsEnum(Language)
    language?: Language
}

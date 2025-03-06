import { IsEmail, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class EmailContactDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string
}

import { IsEmail, IsString, MinLength } from "class-validator"

export class EmailContactDto {
    @IsString()
    @IsEmail()
    email: string
}

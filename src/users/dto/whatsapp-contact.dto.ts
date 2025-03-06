import { IsPhoneNumber, IsString } from "class-validator"

export class WhatsAppContactDto {
    @IsString()
    @IsPhoneNumber()
    phone: string
}

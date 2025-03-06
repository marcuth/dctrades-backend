import { IsString, MinLength } from "class-validator"

export class TelegramContactDto {
    @IsString()
    @MinLength(1, { message: "O nome de usuário do Telegram é obrigatório." })
    telegramUsername: string
}

import { IsString, MinLength } from "class-validator"

export class DiscordContactDto {
    @IsString()
    @MinLength(1, { message: "O ID do Discord é obrigatório." })
    discordUserId: string

    @IsString()
    @MinLength(1, { message: "O nome de usuário do Discord é obrigatório." })
    discordUsername: string
}

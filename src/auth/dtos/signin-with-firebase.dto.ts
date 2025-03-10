import { IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class SignInWithFirebaseDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string
}

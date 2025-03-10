import { IsJWT, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class SignInWithFirebaseDto {
    @ApiProperty()
    @IsString()
    @IsJWT()
    token: string
}

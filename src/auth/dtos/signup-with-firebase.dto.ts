import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class SignUpWithFirebaseDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string

    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    name?: string
}

import { ConfigModule } from "@nestjs/config"
import { Module } from "@nestjs/common"

import { ImgBBService } from "./imgbb.service"

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [ImgBBService],
    exports: [ImgBBService]
})
export class ImgBBModule {}

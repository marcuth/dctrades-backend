import { Module } from "@nestjs/common"

import { ImgBBService } from "./imgbb.service"

@Module({
    providers: [ImgBBService],
})
export class ImgBBModule {}

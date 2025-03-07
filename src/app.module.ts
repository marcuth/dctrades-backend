import { Module } from "@nestjs/common"

import { FirebaseModule } from "nestjs-firebase"

import { OrbTradeOffersModule } from "./orb-trade-offers/orb-trade-offers.module"
import { PrismaModule } from "./prisma/prisma.module"
import configHelper from "./helpers/config.helper"
import { ImgbbModule } from "./imgbb/imgbb.module"
import { UsersModule } from "./users/users.module"

@Module({
    imports: [
        FirebaseModule.forRoot({ googleApplicationCredential: configHelper.firebasePrivateKey }),
        UsersModule,
        PrismaModule,
        OrbTradeOffersModule,
        ImgbbModule,
    ],
})
export class AppModule {}

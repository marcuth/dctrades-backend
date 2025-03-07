import { FirebaseModule } from "nestjs-firebase"
import { ConfigModule } from "@nestjs/config"
import { Module } from "@nestjs/common"

import { OrbTradeOffersModule } from "./orb-trade-offers/orb-trade-offers.module"
import { PrismaModule } from "./prisma/prisma.module"
import configHelper from "./helpers/config.helper"
import { ImgBBModule } from "./imgbb/imgbb.module"
import { UsersModule } from "./users/users.module"

@Module({
    imports: [
        ConfigModule.forRoot(),
        FirebaseModule.forRoot({ googleApplicationCredential: configHelper.firebasePrivateKey }),
        UsersModule,
        PrismaModule,
        OrbTradeOffersModule,
        ImgBBModule,
    ],
})
export class AppModule {}

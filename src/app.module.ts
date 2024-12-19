import { Module } from "@nestjs/common"

import { PrismaModule } from "./prisma/prisma.module"
import { UsersModule } from "./users/users.module"
import { FirebaseModule } from "nestjs-firebase"
import configHelper from "./helpers/config.helper"

@Module({
    imports: [FirebaseModule.forRoot({ googleApplicationCredential: configHelper.firebasePrivateKey }), UsersModule, PrismaModule],
})
export class AppModule {}

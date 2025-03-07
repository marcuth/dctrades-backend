import { Module } from "@nestjs/common"

import { DiscordWebhookModule } from "../discord-webhook/discord-webhook.module"
import { PrismaModule } from "../prisma/prisma.module"
import { UsersController } from "./users.controller"
import configHelper from "../helpers/config.helper"
import { AuthModule } from "../auth/auth.module"
import { UsersService } from "./users.service"
import { ImgBBModule } from "../imgbb/imgbb.module"

@Module({
    imports: [
        DiscordWebhookModule.forFeature({ name: "Users", url: configHelper.discordWebhookUrls.users }),
        PrismaModule,
        AuthModule,
        ImgBBModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}

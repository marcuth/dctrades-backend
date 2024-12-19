import { Module } from "@nestjs/common"

import { DiscordWebhookModule } from "../discord-webhook/discord-webhook.module"
import { PrismaModule } from "../prisma/prisma.module"
import { UsersController } from "./users.controller"
import configHelper from "../helpers/config.helper"
import { AuthModule } from "../auth/auth.module"
import { UsersService } from "./users.service"

@Module({
    imports: [
        DiscordWebhookModule.forFeature({ name: "Users", url: configHelper.discordWebhookUrls.users }),
        PrismaModule,
        AuthModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}

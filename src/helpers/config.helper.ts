import { ValidationPipe } from "@nestjs/common"
import * as dotenv from "dotenv"

const isProduction = process.env.NODE_ENV === "production"

dotenv.config()

const configHelper = {
    isProduction: isProduction,
    app: {
        port: process.env.PORT || 3003,
        validationPipe: new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
        cors: {
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            origin: process.env.CORS_ORIGIN || true,
            credentials: true,
        },
    },
    discordWebhookUrls: {
        users: process.env.DISCORD_WEBHOOK_USERS_URL,
    },
    firebasePrivateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
}

export default configHelper

import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger"
import { INestApplication } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"

import configHelper from "./helpers/config.helper"
import { AppModule } from "./app.module"

async function createSwaggerSpec(document: OpenAPIObject) {
    const fs = await import("fs")

    document.servers = [
        {
            url: `https://localhost:${configHelper.app.port}`,
            description: "Dev",
        },
    ]

    await fs.promises.writeFile("./swagger-spec.json", JSON.stringify(document))
}

async function showModules(app: INestApplication) {
    const { SpelunkerModule } = await import("nestjs-spelunker")
    const util = await import("util")

    console.log(util.inspect(SpelunkerModule.explore(app), { depth: Infinity, colors: true }))
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        rawBody: true,
    })

    app.useGlobalPipes(configHelper.app.validationPipe)
    app.enableCors(configHelper.app.cors)

    const config = new DocumentBuilder().setTitle("Documentação").setVersion("1.0").build()
    const document = SwaggerModule.createDocument(app, config)

    if (!configHelper.isProduction) {
        await showModules(app)
        await createSwaggerSpec(document)
    }

    SwaggerModule.setup("docs", app, document)

    await app.listen(configHelper.app.port)
}

bootstrap()

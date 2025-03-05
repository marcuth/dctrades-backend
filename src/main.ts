import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger"
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
        {
            url: configHelper.app.productionUrl,
            description: "Production",
        },
    ]

    await fs.promises.writeFile("./swagger-spec.json", JSON.stringify(document))
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(configHelper.app.validationPipe)
    app.enableCors(configHelper.app.cors)

    const config = new DocumentBuilder().setTitle("Documentação").setVersion("1.0").build()
    const document = SwaggerModule.createDocument(app, config)

    if (!configHelper.isProduction) {
        await createSwaggerSpec(document)
    }

    SwaggerModule.setup("docs", app, document)

    await app.listen(configHelper.app.port)
}

bootstrap()

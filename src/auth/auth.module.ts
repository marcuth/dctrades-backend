import { forwardRef, Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"

import { FirebaseStrategy } from "./strategies/firebase.strategy"
import { FirebaseAuthGuard } from "./guards/firebase-auth.guard"
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { UsersModule } from "../users/users.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
    imports: [
        PassportModule,
        forwardRef(() => UsersModule),
        JwtModule.register({
            privateKey: process.env.JWT_PRIVATE_KEY,
            signOptions: { expiresIn: process.env.JWT_SIGN_EXPIRES_IN },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, FirebaseStrategy, FirebaseAuthGuard, JwtAuthGuard],
    controllers: [AuthController],
    exports: [AuthService, FirebaseAuthGuard, JwtAuthGuard],
})
export class AuthModule {}

import { Injectable, ExecutionContext } from "@nestjs/common"

import { FirebaseAuthGuard } from "./firebase-auth.guard"
import { JwtAuthGuard } from "./jwt-auth.guard"

@Injectable()
export class MultiAuthGuard {
    constructor(
        private readonly firebaseAuthGuard: FirebaseAuthGuard,
        private readonly jwtAuthGuard: JwtAuthGuard,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const firebaseResult = await this.firebaseAuthGuard.canActivate(context)
            if (firebaseResult) return true
        } catch (error) {}

        try {
            const jwtResult = await this.jwtAuthGuard.canActivate(context)
            if (jwtResult) return true
        } catch (error) {
            return false
        }
    }
}

import { UserRole } from "@prisma/client"
import { Request } from "express"

export interface JwtAuthenticatedUser {
    id: number
    email: string
    username: string
    role: UserRole
}

export interface JwtAuthenticatedRequest extends Request {
    user: JwtAuthenticatedUser
}


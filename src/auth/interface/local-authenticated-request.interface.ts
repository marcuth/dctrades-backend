import { User } from "@prisma/client"

export type LocalAuthenticatedUser = User

export interface LocalAuthenticatedRequest extends Request {
    user: LocalAuthenticatedUser
}
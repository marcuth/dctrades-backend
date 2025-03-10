import { UserRole } from "@prisma/client"

export interface FirebaseAuthenticatedUser {
    id: string
    firebaseUid: string
    email: string
    usename: string
    role: UserRole
}

export interface FirebaseAuthenticatedRequest extends Request {
    user: FirebaseAuthenticatedUser
}

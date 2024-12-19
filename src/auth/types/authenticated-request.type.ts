import { User, UserPreferences, UserProfile } from "@prisma/client"

export type UserWithSensitiveInfo = User & {
    profile: UserProfile
    preferences: UserPreferences
}

export type AuthenticatedRequest = {
    user: UserWithSensitiveInfo
}

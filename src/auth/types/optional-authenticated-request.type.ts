import { UserWithSensitiveInfo } from "./authenticated-request.type"

export type OptionalAuthenticatedRequest = {
    user: UserWithSensitiveInfo | null
}

type Message = string | ((...args: any[]) => string)

const messageHelper = {
    INVALID_FIREBASE_AUTH_TOKEN: "Invalid Firebase Auth Token",
    OBJECT_NOT_FOUND: (objectName: string, objectId?: string) =>
        `The object '${objectName}' with ID '${objectId ?? "UNDEFINED"}' was not found in the database!`,
    UNAUTHORIZED_USER: "",
    REQUEST_WITHOUT_AUTHORIZATION_TOKEN:
        "The request did not send any authorization token! Please provide a token to stop protected routes!",
    INVALID_AUTHORIZATION_TOKEN:
        "This authorization token is invalid for some reason! Please try renewing it or try again!",
} satisfies Record<string, Message>

export default messageHelper

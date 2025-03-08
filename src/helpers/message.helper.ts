type Message = string | ((...args: any[]) => string)

type ObjectNotFoundOptions = {
    name: string
    propertyValue: string
    property?: string
}

const messageHelper = {
    INVALID_FIREBASE_AUTH_TOKEN: "Invalid Firebase Auth Token",
    OBJECT_NOT_FOUND: ({ name, propertyValue, property = "id" }: ObjectNotFoundOptions) =>
        `The object '${name}' with ${property} '${propertyValue ?? "UNDEFINED"}' was not found in the database!`,
    UNAUTHORIZED_USER: "",
    REQUEST_WITHOUT_AUTHORIZATION_TOKEN:
        "The request did not send any authorization token! Please provide a token to stop protected routes!",
    INVALID_AUTHORIZATION_TOKEN:
        "This authorization token is invalid for some reason! Please try renewing it or try again!",
    NO_IMAGES_SENT: "No images were sent.",
    NON_PROPORTIONAL_IMAGE: "The image must be square.",
    FILE_IS_NOT_IMAGE: "The uploaded file is not an image.",
} satisfies Record<string, Message>

export default messageHelper

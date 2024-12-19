type Message = string | ((...args: any[]) => string)

const messageHelper = {
    PAYER_IS_OFFER_ATHOR:
        "The user is not authorized to perform this transaction as this offer was created by the user.",
    INVALID_PAYMENT_METHOD_TYPE: "Invalid payment method type",
    SELL_OFFER_ITEM_OUT_OF_STOCK: "This Sell Offer Item is out of stock!",
    INSUFFICIENT_SELL_OFFER_INVENTORY: (requestedItems: number, availableStock: number) =>
        `Unable to complete purchase. You requested ${requestedItems} sell offer items, but only ${availableStock} are available.`,
    INVALID_FIREBASE_AUTH_TOKEN: "Invalid Firebase Auth Token",
    OBJECT_NOT_FOUND: (objectName: string, objectId?: string) =>
        `The object '${objectName}' with ID '${objectId ?? "UNDEFINED"}' was not found in the database!`,
    UNAUTHORIZED_USER: "",
    REQUEST_WITHOUT_AUTHORIZATION_TOKEN:
        "The request did not send any authorization token! Please provide a token to stop protected routes!",
    INVALID_AUTHORIZATION_TOKEN:
        "This authorization token is invalid for some reason! Please try renewing it or try again!",
    SELF_PURCHASE_NOT_ALLOWED: "You cannot purchase an item from yourself!",
    ORDER_CANNOT_CHANGE_STATUS: (currentStatus: string, newStatus: string) =>
        `This order cannot be changed from "${currentStatus}" to "${newStatus}" at the moment!`,
} satisfies Record<string, Message>

export default messageHelper

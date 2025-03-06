const regexHelper = {
    username: /^[a-z0-9_-]{3,15}$/,
    discordUserId: /^\d{17,19}$/,
    discordUsername: /^(?=.{2,32}$)[A-Za-z0-9_.]+$/,
    telegramUsername: /^[A-Za-z][A-Za-z0-9_]{4,31}$/,
}

export default regexHelper

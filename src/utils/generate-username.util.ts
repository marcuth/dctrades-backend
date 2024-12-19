function generateUsername(name: string): string {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    let randomPart = ""

    for (let i = 0; i < 4; i++) {
        randomPart += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    const normalizedName = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase()

    return `${normalizedName.slice(0, 11)}_${randomPart}`
}

export default generateUsername

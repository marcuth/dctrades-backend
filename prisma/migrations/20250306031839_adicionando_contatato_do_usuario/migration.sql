-- CreateTable
CREATE TABLE "discord_contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "discordUserId" TEXT NOT NULL,
    "discordUsername" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "discord_contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "telegram_contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramUsername" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "telegram_contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "discord_contacts_userId_key" ON "discord_contacts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_contacts_userId_key" ON "telegram_contacts"("userId");

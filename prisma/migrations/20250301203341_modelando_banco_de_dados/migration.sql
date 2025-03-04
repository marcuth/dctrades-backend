/*
  Warnings:

  - Added the required column `category` to the `dragons` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "withdrawal_methods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'PIX',
    "key" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    CONSTRAINT "withdrawal_methods_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "user_wallets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "offered_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "dragonId" INTEGER NOT NULL,
    CONSTRAINT "offered_items_dragonId_fkey" FOREIGN KEY ("dragonId") REFERENCES "dragons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "orb_trade_offers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "dragonId" INTEGER NOT NULL,
    CONSTRAINT "orb_trade_offers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orb_trade_offers_dragonId_fkey" FOREIGN KEY ("dragonId") REFERENCES "dragons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dragons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "description" TEXT,
    "imageName" TEXT NOT NULL
);
INSERT INTO "new_dragons" ("description", "id", "imageName", "name", "rarity") SELECT "description", "id", "imageName", "name", "rarity" FROM "dragons";
DROP TABLE "dragons";
ALTER TABLE "new_dragons" RENAME TO "dragons";
CREATE TABLE "new_orb_sales_offers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dragonId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "orb_sales_offers_dragonId_fkey" FOREIGN KEY ("dragonId") REFERENCES "dragons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orb_sales_offers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orb_sales_offers" ("createdAt", "dragonId", "id", "ownerId", "quantity", "updatedAt") SELECT "createdAt", "dragonId", "id", "ownerId", "quantity", "updatedAt" FROM "orb_sales_offers";
DROP TABLE "orb_sales_offers";
ALTER TABLE "new_orb_sales_offers" RENAME TO "orb_sales_offers";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "mercadoPagoCustomerId" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_users" ("createdAt", "email", "firebaseUid", "id", "mercadoPagoCustomerId", "updatedAt", "username") SELECT "createdAt", "email", "firebaseUid", "id", "mercadoPagoCustomerId", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_firebaseUid_key" ON "users"("firebaseUid");
CREATE UNIQUE INDEX "users_mercadoPagoCustomerId_key" ON "users"("mercadoPagoCustomerId");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "withdrawal_methods_walletId_key" ON "withdrawal_methods"("walletId");

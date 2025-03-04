/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `users` table. All the data in the column will be lost.
  - Added the required column `orbSaleOfferId` to the `prices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "shop_phone_numbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "number" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    CONSTRAINT "shop_phone_numbers_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CREATED',
    "totalPrice" DECIMAL NOT NULL,
    CONSTRAINT "orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "orbSaleOfferId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_items_orbSaleOfferId_fkey" FOREIGN KEY ("orbSaleOfferId") REFERENCES "orb_sales_offers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "disputes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "orderId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    CONSTRAINT "disputes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_prices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" DECIMAL NOT NULL,
    "currencyCode" TEXT NOT NULL DEFAULT 'BRL',
    "orbSaleOfferId" TEXT NOT NULL,
    CONSTRAINT "prices_orbSaleOfferId_fkey" FOREIGN KEY ("orbSaleOfferId") REFERENCES "orb_sales_offers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_prices" ("currencyCode", "id", "quantity") SELECT "currencyCode", "id", "quantity" FROM "prices";
DROP TABLE "prices";
ALTER TABLE "new_prices" RENAME TO "prices";
CREATE UNIQUE INDEX "prices_orbSaleOfferId_key" ON "prices"("orbSaleOfferId");
CREATE TABLE "new_user_wallets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DECIMAL NOT NULL,
    "currencyCode" TEXT NOT NULL DEFAULT 'BRL',
    CONSTRAINT "user_wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_wallets" ("balance", "createdAt", "currencyCode", "id", "updatedAt", "userId") SELECT "balance", "createdAt", "currencyCode", "id", "updatedAt", "userId" FROM "user_wallets";
DROP TABLE "user_wallets";
ALTER TABLE "new_user_wallets" RENAME TO "user_wallets";
CREATE UNIQUE INDEX "user_wallets_userId_key" ON "user_wallets"("userId");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "mercadoPagoCustomerId" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL
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
CREATE UNIQUE INDEX "shop_phone_numbers_shopId_key" ON "shop_phone_numbers"("shopId");

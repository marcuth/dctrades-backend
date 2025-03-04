/*
  Warnings:

  - You are about to drop the `disputes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orb_sales_offers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shop_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shop_phone_numbers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shops` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_avatars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_wallets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `withdrawal_methods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `description` on the `dragons` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `dragons` table. All the data in the column will be lost.
  - You are about to drop the column `mercadoPagoCustomerId` on the `users` table. All the data in the column will be lost.
  - Added the required column `nameKey` to the `dragons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeOfferId` to the `offered_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "prices_orbSaleOfferId_key";

-- DropIndex
DROP INDEX "shop_images_shopId_key";

-- DropIndex
DROP INDEX "shop_phone_numbers_shopId_key";

-- DropIndex
DROP INDEX "user_avatars_profileId_key";

-- DropIndex
DROP INDEX "user_wallets_userId_key";

-- DropIndex
DROP INDEX "withdrawal_methods_walletId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "disputes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "orb_sales_offers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "order_items";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "orders";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "prices";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "shop_images";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "shop_phone_numbers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "shops";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user_avatars";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user_wallets";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "withdrawal_methods";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_dragons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nameKey" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "descriptionKey" TEXT,
    "imageName" TEXT NOT NULL
);
INSERT INTO "new_dragons" ("category", "id", "imageName", "rarity") SELECT "category", "id", "imageName", "rarity" FROM "dragons";
DROP TABLE "dragons";
ALTER TABLE "new_dragons" RENAME TO "dragons";
CREATE TABLE "new_offered_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "dragonId" INTEGER NOT NULL,
    "tradeOfferId" TEXT NOT NULL,
    CONSTRAINT "offered_items_dragonId_fkey" FOREIGN KEY ("dragonId") REFERENCES "dragons" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "offered_items_tradeOfferId_fkey" FOREIGN KEY ("tradeOfferId") REFERENCES "orb_trade_offers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_offered_items" ("createdAt", "dragonId", "id", "quantity", "updatedAt") SELECT "createdAt", "dragonId", "id", "quantity", "updatedAt" FROM "offered_items";
DROP TABLE "offered_items";
ALTER TABLE "new_offered_items" RENAME TO "offered_items";
CREATE TABLE "new_orb_trade_offers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "dragonId" INTEGER NOT NULL,
    CONSTRAINT "orb_trade_offers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "orb_trade_offers_dragonId_fkey" FOREIGN KEY ("dragonId") REFERENCES "dragons" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_orb_trade_offers" ("createdAt", "dragonId", "id", "ownerId", "quantity", "updatedAt") SELECT "createdAt", "dragonId", "id", "ownerId", "quantity", "updatedAt" FROM "orb_trade_offers";
DROP TABLE "orb_trade_offers";
ALTER TABLE "new_orb_trade_offers" RENAME TO "orb_trade_offers";
CREATE TABLE "new_user_preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "userId" TEXT NOT NULL,
    CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_preferences" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "user_preferences";
DROP TABLE "user_preferences";
ALTER TABLE "new_user_preferences" RENAME TO "user_preferences";
CREATE UNIQUE INDEX "user_preferences_userId_key" ON "user_preferences"("userId");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_users" ("createdAt", "email", "firebaseUid", "id", "role", "updatedAt", "username") SELECT "createdAt", "email", "firebaseUid", "id", "role", "updatedAt", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_firebaseUid_key" ON "users"("firebaseUid");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

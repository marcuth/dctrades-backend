/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `user_profiles` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "shop_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "url" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    CONSTRAINT "shop_images_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "shops" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "user_avatars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "user_avatars_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_wallets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DECIMAL NOT NULL,
    "currencyCode" TEXT NOT NULL,
    CONSTRAINT "user_wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dragons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "description" TEXT,
    "imageName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "prices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" DECIMAL NOT NULL,
    "currencyCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "orb_sales_offers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "dragonId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "orb_sales_offers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "biography" TEXT,
    CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_profiles" ("biography", "id", "name", "userId") SELECT "biography", "id", "name", "userId" FROM "user_profiles";
DROP TABLE "user_profiles";
ALTER TABLE "new_user_profiles" RENAME TO "user_profiles";
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "shop_images_shopId_key" ON "shop_images"("shopId");

-- CreateIndex
CREATE UNIQUE INDEX "user_avatars_profileId_key" ON "user_avatars"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "user_wallets_userId_key" ON "user_wallets"("userId");

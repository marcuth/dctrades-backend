-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_avatars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "url" TEXT,
    CONSTRAINT "user_avatars_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_avatars" ("id", "profileId", "url") SELECT "id", "profileId", "url" FROM "user_avatars";
DROP TABLE "user_avatars";
ALTER TABLE "new_user_avatars" RENAME TO "user_avatars";
CREATE UNIQUE INDEX "user_avatars_profileId_key" ON "user_avatars"("profileId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

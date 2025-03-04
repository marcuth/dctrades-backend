-- CreateTable
CREATE TABLE "user_avatars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    CONSTRAINT "user_avatars_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_avatars_profileId_key" ON "user_avatars"("profileId");

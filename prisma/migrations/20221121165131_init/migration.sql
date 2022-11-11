-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoritesAdvertisements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "advertisementId" TEXT NOT NULL,
    CONSTRAINT "FavoritesAdvertisements_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "Advertisement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FavoritesAdvertisements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FavoritesAdvertisements" ("advertisementId", "id", "userId") SELECT "advertisementId", "id", "userId" FROM "FavoritesAdvertisements";
DROP TABLE "FavoritesAdvertisements";
ALTER TABLE "new_FavoritesAdvertisements" RENAME TO "FavoritesAdvertisements";
CREATE UNIQUE INDEX "FavoritesAdvertisements_userId_advertisementId_key" ON "FavoritesAdvertisements"("userId", "advertisementId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdvertisementToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `price` on the `Advertisement` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to alter the column `surface` on the `Advertisement` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.

*/
-- DropIndex
DROP INDEX "_AdvertisementToCategory_B_index";

-- DropIndex
DROP INDEX "_AdvertisementToCategory_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AdvertisementToCategory";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Advertisement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "localization" TEXT NOT NULL,
    "surface" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "energyDPE" TEXT,
    "energyGES" TEXT
);
INSERT INTO "new_Advertisement" ("bedrooms", "description", "energyDPE", "energyGES", "id", "image", "localization", "price", "rooms", "surface", "type") SELECT "bedrooms", "description", "energyDPE", "energyGES", "id", "image", "localization", "price", "rooms", "surface", "type" FROM "Advertisement";
DROP TABLE "Advertisement";
ALTER TABLE "new_Advertisement" RENAME TO "Advertisement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

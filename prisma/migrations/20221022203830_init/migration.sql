-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Advertisement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "localization" TEXT NOT NULL,
    "surface" DECIMAL NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "energyDPE" TEXT,
    "energyGES" TEXT
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT
);

-- CreateTable
CREATE TABLE "FavoritesAdvertisements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "advertisementId" TEXT NOT NULL,
    CONSTRAINT "FavoritesAdvertisements_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "Advertisement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoritesAdvertisements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AdvertisementToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AdvertisementToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Advertisement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AdvertisementToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoritesAdvertisements_userId_advertisementId_key" ON "FavoritesAdvertisements"("userId", "advertisementId");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvertisementToCategory_AB_unique" ON "_AdvertisementToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvertisementToCategory_B_index" ON "_AdvertisementToCategory"("B");

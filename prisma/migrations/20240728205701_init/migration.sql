-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "comment" TEXT NOT NULL,
    "publishAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*
  Warnings:

  - Added the required column `blob` to the `ProjectImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `ProjectImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN "githubUrl" TEXT;
ALTER TABLE "Project" ADD COLUMN "liveUrl" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "blob" BLOB NOT NULL,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProjectImage" ("createdAt", "id", "projectId", "updatedAt") SELECT "createdAt", "id", "projectId", "updatedAt" FROM "ProjectImage";
DROP TABLE "ProjectImage";
ALTER TABLE "new_ProjectImage" RENAME TO "ProjectImage";
CREATE UNIQUE INDEX "ProjectImage_projectId_key" ON "ProjectImage"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

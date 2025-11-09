-- AlterTable
ALTER TABLE "ProjectImage" ADD COLUMN     "blurhash" TEXT;

-- CreateIndex
CREATE INDEX "Post_createdAt_slug_idx" ON "Post"("createdAt", "slug");

-- CreateIndex
CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt");

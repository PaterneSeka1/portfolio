-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('draft', 'published', 'archived');

-- AlterTable: replace the published flag with a status, keeping existing values
ALTER TABLE "Project" ADD COLUMN "status" "ProjectStatus" NOT NULL DEFAULT 'draft';
UPDATE "Project" SET "status" = CASE WHEN "published" THEN 'published'::"ProjectStatus" ELSE 'draft'::"ProjectStatus" END;
ALTER TABLE "Project" DROP COLUMN "published";

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "current" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[];

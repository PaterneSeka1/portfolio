-- AlterEnum
ALTER TYPE "ProjectCategory" ADD VALUE 'ai';

-- AlterTable
ALTER TABLE "ContactMessage" ALTER COLUMN "timeline" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "en" JSONB;

-- AlterTable
ALTER TABLE "Expertise" ADD COLUMN     "en" JSONB;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "en" JSONB,
ADD COLUMN     "tagline" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "en" JSONB;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "en" JSONB,
ADD COLUMN     "learning" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "completed" DROP NOT NULL,
ALTER COLUMN "completed" SET DEFAULT false;

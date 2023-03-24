/*
  Warnings:

  - You are about to drop the column `date` on the `Lesson` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "NoteBook_name_key";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - Made the column `lessonId` on table `Whiteboard` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Whiteboard" DROP CONSTRAINT "Whiteboard_lessonId_fkey";

-- AlterTable
ALTER TABLE "NoteBook" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Whiteboard" ALTER COLUMN "lessonId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Whiteboard" ADD CONSTRAINT "Whiteboard_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `date` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recording` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "recording" BOOLEAN NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "notes" BYTEA NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Library_userId_key" ON "Library"("userId");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Lesson_name_key" ON "Lesson"("name");

/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");

-- CreateIndex
CREATE UNIQUE INDEX "School_email_key" ON "School"("email");

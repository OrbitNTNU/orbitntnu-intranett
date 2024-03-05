/*
  Warnings:

  - A unique constraint covering the columns `[orbitMail]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `orbitMail_UNIQUE` ON `Member`(`orbitMail`);

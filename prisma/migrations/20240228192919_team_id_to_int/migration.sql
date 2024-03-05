/*
  Warnings:

  - The primary key for the `ApplyForTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `teamID` on the `ApplyForTeam` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `teamID` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `teamID` on the `TeamHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `ApplyForTeam` DROP FOREIGN KEY `ApplyForTeam_teamID_fkey`;

-- DropForeignKey
ALTER TABLE `TeamHistory` DROP FOREIGN KEY `TeamHistory_teamID_fkey`;

-- AlterTable
ALTER TABLE `ApplyForTeam` DROP PRIMARY KEY,
    MODIFY `teamID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`applicationID`, `teamID`);

-- AlterTable
ALTER TABLE `Team` DROP PRIMARY KEY,
    MODIFY `teamID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`teamID`);

-- AlterTable
ALTER TABLE `TeamHistory` MODIFY `teamID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ApplyForTeam` ADD CONSTRAINT `ApplyForTeam_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `Team`(`teamID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamHistory` ADD CONSTRAINT `TeamHistory_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `Team`(`teamID`) ON DELETE RESTRICT ON UPDATE CASCADE;

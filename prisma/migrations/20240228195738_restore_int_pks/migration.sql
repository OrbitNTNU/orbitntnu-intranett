/*
  Warnings:

  - The primary key for the `Announcement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `announcementID` on the `Announcement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `memberID` on the `Announcement` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `applicationID` on the `Application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `ApplyForTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `applicationID` on the `ApplyForTeam` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `eventID` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `memberID` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Interview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `interviewerID` on the `Interview` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `applicationID` on the `Interview` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `memberID` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `memberID` on the `Meme` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `TeamHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `teamHistoryID` on the `TeamHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `memberID` on the `TeamHistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_memberID_fkey`;

-- DropForeignKey
ALTER TABLE `ApplyForTeam` DROP FOREIGN KEY `ApplyForTeam_applicationID_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_memberID_fkey`;

-- DropForeignKey
ALTER TABLE `Interview` DROP FOREIGN KEY `Interview_applicationID_fkey`;

-- DropForeignKey
ALTER TABLE `Interview` DROP FOREIGN KEY `Interview_interviewerID_fkey`;

-- DropForeignKey
ALTER TABLE `Meme` DROP FOREIGN KEY `Meme_memberID_fkey`;

-- DropForeignKey
ALTER TABLE `TeamHistory` DROP FOREIGN KEY `TeamHistory_memberID_fkey`;

-- AlterTable
ALTER TABLE `Announcement` DROP PRIMARY KEY,
    MODIFY `announcementID` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `memberID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`announcementID`);

-- AlterTable
ALTER TABLE `Application` DROP PRIMARY KEY,
    MODIFY `applicationID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`applicationID`);

-- AlterTable
ALTER TABLE `ApplyForTeam` DROP PRIMARY KEY,
    MODIFY `applicationID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`applicationID`, `teamID`);

-- AlterTable
ALTER TABLE `Event` DROP PRIMARY KEY,
    MODIFY `eventID` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `memberID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`eventID`);

-- AlterTable
ALTER TABLE `Interview` DROP PRIMARY KEY,
    MODIFY `interviewerID` INTEGER NOT NULL,
    MODIFY `applicationID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`interviewerID`, `applicationID`);

-- AlterTable
ALTER TABLE `Member` DROP PRIMARY KEY,
    MODIFY `memberID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`memberID`);

-- AlterTable
ALTER TABLE `Meme` MODIFY `memberID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TeamHistory` DROP PRIMARY KEY,
    MODIFY `teamHistoryID` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `memberID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`teamHistoryID`);

-- DropTable
DROP TABLE `Example`;

-- AddForeignKey
ALTER TABLE `ApplyForTeam` ADD CONSTRAINT `ApplyForTeam_applicationID_fkey` FOREIGN KEY (`applicationID`) REFERENCES `Application`(`applicationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_applicationID_fkey` FOREIGN KEY (`applicationID`) REFERENCES `Application`(`applicationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_interviewerID_fkey` FOREIGN KEY (`interviewerID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamHistory` ADD CONSTRAINT `TeamHistory_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meme` ADD CONSTRAINT `Meme_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

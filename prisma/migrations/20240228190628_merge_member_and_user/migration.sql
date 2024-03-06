/*
  Warnings:

  - The primary key for the `Announcement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ApplyForTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Interview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firstName` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Member` table. All the data in the column will be lost.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TeamHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_memberID_fkey`;

-- DropForeignKey
ALTER TABLE `ApplyForTeam` DROP FOREIGN KEY `ApplyForTeam_applicationID_fkey`;

-- DropForeignKey
ALTER TABLE `ApplyForTeam` DROP FOREIGN KEY `ApplyForTeam_teamID_fkey`;

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

-- DropForeignKey
ALTER TABLE `TeamHistory` DROP FOREIGN KEY `TeamHistory_teamID_fkey`;

-- AlterTable
ALTER TABLE `Announcement` DROP PRIMARY KEY,
    MODIFY `announcementID` VARCHAR(191) NOT NULL,
    MODIFY `memberID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`announcementID`);

-- AlterTable
ALTER TABLE `Application` DROP PRIMARY KEY,
    MODIFY `applicationID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`applicationID`);

-- AlterTable
ALTER TABLE `ApplyForTeam` DROP PRIMARY KEY,
    MODIFY `applicationID` VARCHAR(191) NOT NULL,
    MODIFY `teamID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`applicationID`, `teamID`);

-- AlterTable
ALTER TABLE `Event` DROP PRIMARY KEY,
    MODIFY `eventID` VARCHAR(191) NOT NULL,
    MODIFY `memberID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`eventID`);

-- AlterTable
ALTER TABLE `Interview` DROP PRIMARY KEY,
    MODIFY `interviewerID` VARCHAR(191) NOT NULL,
    MODIFY `applicationID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`interviewerID`, `applicationID`);

-- AlterTable
ALTER TABLE `Member` DROP PRIMARY KEY,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `memberID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`memberID`);

-- AlterTable
ALTER TABLE `Meme` MODIFY `memberID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Team` DROP PRIMARY KEY,
    MODIFY `teamID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`teamID`);

-- AlterTable
ALTER TABLE `TeamHistory` DROP PRIMARY KEY,
    MODIFY `teamHistoryID` VARCHAR(191) NOT NULL,
    MODIFY `memberID` VARCHAR(191) NOT NULL,
    MODIFY `teamID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`teamHistoryID`);

-- AlterTable
ALTER TABLE `User` DROP COLUMN `emailVerified`,
    DROP COLUMN `name`,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_email_fkey` FOREIGN KEY (`email`) REFERENCES `Member`(`orbitMail`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplyForTeam` ADD CONSTRAINT `ApplyForTeam_applicationID_fkey` FOREIGN KEY (`applicationID`) REFERENCES `Application`(`applicationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplyForTeam` ADD CONSTRAINT `ApplyForTeam_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `Team`(`teamID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_applicationID_fkey` FOREIGN KEY (`applicationID`) REFERENCES `Application`(`applicationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_interviewerID_fkey` FOREIGN KEY (`interviewerID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamHistory` ADD CONSTRAINT `TeamHistory_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamHistory` ADD CONSTRAINT `TeamHistory_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `Team`(`teamID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meme` ADD CONSTRAINT `Meme_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

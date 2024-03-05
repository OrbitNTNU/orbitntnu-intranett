/*
  Warnings:

  - You are about to drop the `InterestedIn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `InterestedIn` DROP FOREIGN KEY `InterestedIn_applicationID_fkey`;

-- DropForeignKey
ALTER TABLE `InterestedIn` DROP FOREIGN KEY `InterestedIn_memberID_fkey`;

-- DropIndex
DROP INDEX `Member_orbitMail_key` ON `Member`;

-- DropIndex
DROP INDEX `Member_slackToken_key` ON `Member`;

-- AlterTable
ALTER TABLE `ApplyForTeam` ADD COLUMN `interested` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Member` ADD COLUMN `personalMail` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `InterestedIn`;

-- CreateTable
CREATE TABLE `Example` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Example_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

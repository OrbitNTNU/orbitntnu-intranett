-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_fkey`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `applicationID` INTEGER NOT NULL AUTO_INCREMENT,
    `ntnuUsername` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `fieldOfStudy` VARCHAR(191) NOT NULL,
    `yearOfStudy` INTEGER NOT NULL,
    `experience` TEXT NOT NULL,
    `aboutYou` TEXT NOT NULL,
    `accepted` BOOLEAN NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `keep` BOOLEAN NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `rejectTime` TIME(0) NULL,

    UNIQUE INDEX `Application_ntnuUsername_key`(`ntnuUsername`),
    UNIQUE INDEX `Application_email_key`(`email`),
    UNIQUE INDEX `Application_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`applicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApplyForTeam` (
    `applicationID` INTEGER NOT NULL,
    `teamID` INTEGER NOT NULL,
    `priority` INTEGER NOT NULL,

    INDEX `ApplyForTeam_teamID_fkey`(`teamID`),
    PRIMARY KEY (`applicationID`, `teamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interview` (
    `interviewerID` INTEGER NOT NULL,
    `applicationID` INTEGER NOT NULL,
    `room` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Interview_applicationID_key`(`applicationID`),
    PRIMARY KEY (`interviewerID`, `applicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterestedIn` (
    `memberID` INTEGER NOT NULL,
    `applicationID` INTEGER NOT NULL,

    INDEX `InterestedIn_applicationID_fkey`(`applicationID`),
    PRIMARY KEY (`memberID`, `applicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `teamID` INTEGER NOT NULL AUTO_INCREMENT,
    `teamName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teamID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `memberID` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `activeStatus` BOOLEAN NOT NULL DEFAULT true,
    `fieldOfStudy` VARCHAR(191) NULL,
    `birthday` DATE NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `ntnuMail` VARCHAR(191) NULL,
    `orbitMail` VARCHAR(191) NOT NULL,
    `nationalities` VARCHAR(191) NULL,
    `yearOfStudy` INTEGER NULL,
    `additionalComments` TEXT NULL,
    `slackToken` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `Member_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `Member_ntnuMail_key`(`ntnuMail`),
    UNIQUE INDEX `Member_orbitMail_key`(`orbitMail`),
    UNIQUE INDEX `Member_slackToken_key`(`slackToken`),
    UNIQUE INDEX `Member_userId_key`(`userId`),
    PRIMARY KEY (`memberID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamHistory` (
    `teamHistoryID` INTEGER NOT NULL AUTO_INCREMENT,
    `memberID` INTEGER NOT NULL,
    `teamID` INTEGER NOT NULL,
    `startYear` YEAR NOT NULL,
    `startSem` ENUM('FALL', 'SPRING') NOT NULL,
    `endYear` YEAR NULL,
    `endSem` ENUM('FALL', 'SPRING') NULL,
    `priviledges` ENUM('MEMBER', 'BOARD', 'LEADER', 'MENTOR') NOT NULL DEFAULT 'MEMBER',
    `cPosition` ENUM('CEO', 'COO', 'CTO', 'CFO', 'CMO', 'CIO', 'CHRO', 'PM_FS1', 'PM_FS1.5', 'PM_FS2', 'PM_BS', 'NTNU_REP') NULL,

    INDEX `TeamHistory_teamID_fkey`(`teamID`),
    PRIMARY KEY (`teamHistoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meme` (
    `week` INTEGER NOT NULL,
    `year` YEAR NOT NULL,
    `memberID` INTEGER NOT NULL,
    `meme` LONGBLOB NOT NULL,

    INDEX `Meme_memberID_fkey`(`memberID`),
    PRIMARY KEY (`week`, `year`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `announcementID` INTEGER NOT NULL AUTO_INCREMENT,
    `postTime` DATETIME(3) NOT NULL,
    `memberID` INTEGER NOT NULL,
    `announcement` TEXT NOT NULL,

    INDEX `Announcement_memberID_fkey`(`memberID`),
    PRIMARY KEY (`announcementID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `eventID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `description` TEXT NULL,
    `location` VARCHAR(191) NOT NULL,
    `memberID` INTEGER NOT NULL,
    `timeOfCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` ENUM('SOCIAL', 'WORK', 'PRIORITY') NOT NULL,
    `endTime` DATETIME(3) NOT NULL,

    INDEX `Event_memberID_fkey`(`memberID`),
    PRIMARY KEY (`eventID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplyForTeam` ADD CONSTRAINT `ApplyForTeam_applicationID_fkey` FOREIGN KEY (`applicationID`) REFERENCES `Application`(`applicationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ApplyForTeam` ADD CONSTRAINT `ApplyForTeam_teamID_fkey` FOREIGN KEY (`teamID`) REFERENCES `Team`(`teamID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_applicationID_fkey` FOREIGN KEY (`applicationID`) REFERENCES `Application`(`applicationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Interview` ADD CONSTRAINT `Interview_interviewerID_fkey` FOREIGN KEY (`interviewerID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterestedIn` ADD CONSTRAINT `InterestedIn_applicationID_fkey` FOREIGN KEY (`applicationID`) REFERENCES `Application`(`applicationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterestedIn` ADD CONSTRAINT `InterestedIn_memberID_fkey` FOREIGN KEY (`memberID`) REFERENCES `Member`(`memberID`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastActive` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

/*
  Warnings:

  - You are about to alter the column `text` on the `message` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `message` MODIFY `text` VARCHAR(191) NOT NULL;

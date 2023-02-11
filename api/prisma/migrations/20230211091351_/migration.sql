/*
  Warnings:

  - You are about to alter the column `files` on the `message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `message` MODIFY `files` JSON NULL;

/*
  Warnings:

  - Made the column `text` on table `message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `message` MODIFY `text` LONGBLOB NOT NULL;

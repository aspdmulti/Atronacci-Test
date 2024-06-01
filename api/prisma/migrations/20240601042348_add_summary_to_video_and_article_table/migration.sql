/*
  Warnings:

  - Added the required column `summary` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `summary` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `video` ADD COLUMN `summary` VARCHAR(191) NOT NULL;

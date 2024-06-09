-- AlterTable
ALTER TABLE `article` MODIFY `content` LONGTEXT NOT NULL,
    MODIFY `summary` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `video` MODIFY `summary` LONGTEXT NOT NULL;

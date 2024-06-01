-- AlterTable
ALTER TABLE `user` MODIFY `membership` ENUM('free', 'advanced', 'premium') NOT NULL DEFAULT 'free';

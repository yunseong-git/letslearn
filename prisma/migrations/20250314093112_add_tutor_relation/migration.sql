/*
  Warnings:

  - Added the required column `tutorId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` ADD COLUMN `tutorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

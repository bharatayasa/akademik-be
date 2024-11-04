/*
  Warnings:

  - You are about to drop the column `mata_pelajaran_id` on the `Guru` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Guru` DROP FOREIGN KEY `Guru_mata_pelajaran_id_fkey`;

-- DropIndex
DROP INDEX `User_id_guru_key` ON `User`;

-- DropIndex
DROP INDEX `User_id_siswa_key` ON `User`;

-- AlterTable
ALTER TABLE `Guru` DROP COLUMN `mata_pelajaran_id`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`id_siswa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `Guru`(`id_guru`) ON DELETE SET NULL ON UPDATE CASCADE;

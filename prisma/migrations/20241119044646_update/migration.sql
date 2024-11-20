/*
  Warnings:

  - Made the column `status_guru` on table `Guru` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status_siswa` on table `Siswa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Guru` MODIFY `status_guru` ENUM('Aktif', 'Nonaktif') NOT NULL;

-- AlterTable
ALTER TABLE `Siswa` MODIFY `status_siswa` ENUM('Aktif', 'Lulus', 'Dropout') NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`id_siswa`) ON DELETE SET NULL ON UPDATE CASCADE;

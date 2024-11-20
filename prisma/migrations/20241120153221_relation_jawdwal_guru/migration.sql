-- AddForeignKey
ALTER TABLE `Kelas` ADD CONSTRAINT `Kelas_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `Guru`(`id_guru`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`id_siswa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_id_jadwal_fkey` FOREIGN KEY (`id_jadwal`) REFERENCES `Jadwal`(`id_jadwal`) ON DELETE RESTRICT ON UPDATE CASCADE;

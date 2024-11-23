-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_kelas_fkey` FOREIGN KEY (`id_kelas`) REFERENCES `Kelas`(`id_kelas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_mata_pelajaran_fkey` FOREIGN KEY (`id_mata_pelajaran`) REFERENCES `MataPelajaran`(`id_mata_pelajaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

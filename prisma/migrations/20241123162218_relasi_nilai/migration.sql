-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa`(`id_siswa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nilai` ADD CONSTRAINT `Nilai_id_mata_pelajaran_fkey` FOREIGN KEY (`id_mata_pelajaran`) REFERENCES `MataPelajaran`(`id_mata_pelajaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `Guru`(`id_guru`) ON DELETE SET NULL ON UPDATE CASCADE;

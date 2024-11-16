-- DropForeignKey
ALTER TABLE `Jadwal` DROP FOREIGN KEY `Jadwal_id_guru_fkey`;

-- DropForeignKey
ALTER TABLE `Jadwal` DROP FOREIGN KEY `Jadwal_id_kelas_fkey`;

-- DropForeignKey
ALTER TABLE `Jadwal` DROP FOREIGN KEY `Jadwal_id_mata_pelajaran_fkey`;

-- DropForeignKey
ALTER TABLE `Kehadiran` DROP FOREIGN KEY `Kehadiran_id_jadwal_fkey`;

-- DropForeignKey
ALTER TABLE `Kehadiran` DROP FOREIGN KEY `Kehadiran_id_siswa_fkey`;

-- DropForeignKey
ALTER TABLE `Kelas` DROP FOREIGN KEY `Kelas_id_guru_fkey`;

-- DropForeignKey
ALTER TABLE `Nilai` DROP FOREIGN KEY `Nilai_id_mata_pelajaran_fkey`;

-- DropForeignKey
ALTER TABLE `Nilai` DROP FOREIGN KEY `Nilai_id_siswa_fkey`;

-- DropForeignKey
ALTER TABLE `Siswa` DROP FOREIGN KEY `Siswa_id_kelas_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_id_guru_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_id_siswa_fkey`;

-- AlterTable
ALTER TABLE `Guru` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Jadwal` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Kehadiran` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Kelas` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `MataPelajaran` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Nilai` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Siswa` MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

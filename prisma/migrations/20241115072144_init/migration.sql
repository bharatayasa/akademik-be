-- DropIndex
DROP INDEX `Jadwal_id_guru_fkey` ON `Jadwal`;

-- DropIndex
DROP INDEX `Jadwal_id_kelas_fkey` ON `Jadwal`;

-- DropIndex
DROP INDEX `Jadwal_id_mata_pelajaran_fkey` ON `Jadwal`;

-- DropIndex
DROP INDEX `Kehadiran_id_jadwal_fkey` ON `Kehadiran`;

-- DropIndex
DROP INDEX `Kehadiran_id_siswa_fkey` ON `Kehadiran`;

-- DropIndex
DROP INDEX `Kelas_id_guru_fkey` ON `Kelas`;

-- DropIndex
DROP INDEX `Nilai_id_mata_pelajaran_fkey` ON `Nilai`;

-- DropIndex
DROP INDEX `Nilai_id_siswa_fkey` ON `Nilai`;

-- DropIndex
DROP INDEX `Siswa_id_kelas_fkey` ON `Siswa`;

-- DropIndex
DROP INDEX `User_id_guru_fkey` ON `User`;

-- DropIndex
DROP INDEX `User_id_siswa_fkey` ON `User`;

-- CreateTable
CREATE TABLE `BlacklistedToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BlacklistedToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

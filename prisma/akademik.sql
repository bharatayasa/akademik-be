-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 101.128.64.219:3306
-- Generation Time: Nov 20, 2024 at 03:11 PM
-- Server version: 10.11.5-MariaDB-log
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `akademik`
--

-- --------------------------------------------------------

--
-- Table structure for table `BlacklistedToken`
--

CREATE TABLE `BlacklistedToken` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Guru`
--

CREATE TABLE `Guru` (
  `id_guru` int(11) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `tanggal_lahir` datetime(3) NOT NULL,
  `jenis_kelamin` enum('LakiLaki','Perempuan') NOT NULL,
  `alamat` varchar(191) DEFAULT NULL,
  `no_telepon` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `status_guru` enum('Aktif','Nonaktif') NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Guru`
--

INSERT INTO `Guru` (`id_guru`, `nama`, `tanggal_lahir`, `jenis_kelamin`, `alamat`, `no_telepon`, `email`, `status_guru`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Budi Santoso', '1980-05-15 00:00:00.000', 'LakiLaki', 'Jl. Merpati No. 5', '081234567890', 'budi@guru.com', 'Aktif', '2024-11-19 04:51:41.000', '2024-11-19 04:51:41.000', NULL),
(2, 'Siti Aminah', '1985-08-20 00:00:00.000', 'Perempuan', 'Jl. Anggrek No. 8', '081234567891', 'siti@guru.com', 'Aktif', '2024-11-19 04:51:41.000', '2024-11-19 04:51:41.000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Jadwal`
--

CREATE TABLE `Jadwal` (
  `id_jadwal` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `id_mata_pelajaran` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `hari` enum('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu') DEFAULT NULL,
  `jam_mulai` datetime(3) DEFAULT NULL,
  `jam_selesai` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Jadwal`
--

INSERT INTO `Jadwal` (`id_jadwal`, `id_kelas`, `id_mata_pelajaran`, `id_guru`, `hari`, `jam_mulai`, `jam_selesai`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 1, 'Senin', '2024-11-20 08:00:00.000', '2024-11-20 09:30:00.000', '2024-11-19 04:53:05.000', '2024-11-19 04:53:05.000', NULL),
(2, 1, 2, 2, 'Selasa', '2024-11-21 10:00:00.000', '2024-11-21 11:30:00.000', '2024-11-19 04:53:05.000', '2024-11-19 04:53:05.000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Kehadiran`
--

CREATE TABLE `Kehadiran` (
  `id_kehadiran` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_jadwal` int(11) NOT NULL,
  `tanggal` datetime(3) DEFAULT NULL,
  `status` enum('Hadir','TidakHadir','Izin','Sakit') DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Kehadiran`
--

INSERT INTO `Kehadiran` (`id_kehadiran`, `id_siswa`, `id_jadwal`, `tanggal`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, '2024-11-20 00:00:00.000', 'Hadir', '2024-11-19 04:53:15.000', '2024-11-19 04:53:15.000', NULL),
(2, 2, 1, '2024-11-20 00:00:00.000', 'Izin', '2024-11-19 04:53:15.000', '2024-11-19 04:53:15.000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Kelas`
--

CREATE TABLE `Kelas` (
  `id_kelas` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `nama_kelas` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deleted_at` datetime(3) DEFAULT NULL,
  `semester` enum('Ganjil','Genap') NOT NULL,
  `tingkat` enum('X','XI','XII') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Kelas`
--

INSERT INTO `Kelas` (`id_kelas`, `id_guru`, `nama_kelas`, `created_at`, `updated_at`, `deleted_at`, `semester`, `tingkat`) VALUES
(1, 1, 'X IPA 1', '2024-11-19 04:52:15.000', '2024-11-19 04:52:15.000', NULL, 'Ganjil', 'X'),
(2, 2, 'XI IPA 2', '2024-11-19 04:52:15.000', '2024-11-19 04:52:15.000', NULL, 'Genap', 'XI');

-- --------------------------------------------------------

--
-- Table structure for table `MataPelajaran`
--

CREATE TABLE `MataPelajaran` (
  `id_mata_pelajaran` int(11) NOT NULL,
  `nama_mata_pelajaran` varchar(191) NOT NULL,
  `deskripsi` varchar(191) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `MataPelajaran`
--

INSERT INTO `MataPelajaran` (`id_mata_pelajaran`, `nama_mata_pelajaran`, `deskripsi`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Matematika', 'Pelajaran Matematika Dasar', '2024-11-19 04:51:28.000', '2024-11-19 04:51:28.000', NULL),
(2, 'Bahasa Inggris', 'Pelajaran Bahasa Inggris Tingkat Lanjut', '2024-11-19 04:51:28.000', '2024-11-19 04:51:28.000', NULL),
(3, 'Fisika', 'Pelajaran Fisika untuk Kelas XI', '2024-11-19 04:51:28.000', '2024-11-19 04:51:28.000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Nilai`
--

CREATE TABLE `Nilai` (
  `id_nilai` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_mata_pelajaran` int(11) NOT NULL,
  `nilai` int(11) DEFAULT NULL,
  `tanggal` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deleted_at` datetime(3) DEFAULT NULL,
  `semester` enum('Ganjil','Genap') NOT NULL,
  `tingkat` enum('X','XI','XII') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Nilai`
--

INSERT INTO `Nilai` (`id_nilai`, `id_siswa`, `id_mata_pelajaran`, `nilai`, `tanggal`, `created_at`, `updated_at`, `deleted_at`, `semester`, `tingkat`) VALUES
(1, 1, 1, 85, '2024-11-18 00:00:00.000', '2024-11-19 04:53:24.000', '2024-11-19 04:53:24.000', NULL, 'Ganjil', 'X'),
(2, 2, 2, 90, '2024-11-18 00:00:00.000', '2024-11-19 04:53:24.000', '2024-11-19 04:53:24.000', NULL, 'Ganjil', 'X');

-- --------------------------------------------------------

--
-- Table structure for table `Siswa`
--

CREATE TABLE `Siswa` (
  `id_siswa` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `nama` varchar(191) NOT NULL,
  `tanggal_lahir` datetime(3) NOT NULL,
  `jenis_kelamin` enum('LakiLaki','Perempuan') NOT NULL,
  `alamat` varchar(191) DEFAULT NULL,
  `no_telepon` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `status_siswa` enum('Aktif','Lulus','Dropout') NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deleted_at` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Siswa`
--

INSERT INTO `Siswa` (`id_siswa`, `id_kelas`, `nama`, `tanggal_lahir`, `jenis_kelamin`, `alamat`, `no_telepon`, `email`, `status_siswa`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Ahmad Ridho', '2005-09-15 00:00:00.000', 'LakiLaki', 'Jl. Melati No. 9', '081234567892', 'ahmad@siswa.com', 'Aktif', '2024-11-19 04:52:26.000', '2024-11-19 04:52:26.000', NULL),
(2, 1, 'Rina Sari', '2006-03-22 00:00:00.000', 'Perempuan', 'Jl. Mawar No. 7', '081234567893', 'rina@siswa.com', 'Aktif', '2024-11-19 04:52:26.000', '2024-11-19 04:52:26.000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `deleted_at` datetime(3) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `id_siswa` int(11) DEFAULT NULL,
  `id_guru` int(11) DEFAULT NULL,
  `username` varchar(191) NOT NULL,
  `password_hash` varchar(191) NOT NULL,
  `role` enum('admin','guru','siswa') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`created_at`, `updated_at`, `deleted_at`, `id_user`, `id_siswa`, `id_guru`, `username`, `password_hash`, `role`) VALUES
('2024-11-19 04:53:41.000', '2024-11-19 04:53:41.000', NULL, 1, 1, NULL, 'ahmad123', 'hashed_password_1', 'siswa'),
('2024-11-19 04:53:41.000', '2024-11-19 04:53:41.000', NULL, 2, NULL, 1, 'budi_admin', 'hashed_password_2', 'guru'),
('2024-11-19 04:54:30.147', '2024-11-19 04:54:30.147', NULL, 3, NULL, NULL, 'admin', '$2b$10$PPHNWZCC78wUbjl0UOlpc.bBvAmFhNfrx2JUSsf/UZpXJulMEMSiy', 'admin'),
('2024-11-19 04:54:46.602', '2024-11-19 04:54:46.602', NULL, 4, NULL, 2, 'guru', '$2b$10$7xreHNt6F4y6eMfsIYbqBuKzuxu5WVLwSRs35UVdgMoXq/fOesk2e', 'guru'),
('2024-11-19 04:54:55.431', '2024-11-19 04:54:55.431', NULL, 5, 2, NULL, 'siswa', '$2b$10$Exs3fWuLcNODbuyvKqXcB.shhcUzDsPF58hu7e7CdkN.keQslokZO', 'siswa');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('293d3c7f-d343-423a-ad47-25d512888543', 'ada3e9734947105928016e373bfc790d9a43a71f32ecad3a9b937519383d00f4', '2024-11-19 04:46:42.797', '20241103134636_init', NULL, NULL, '2024-11-19 04:46:42.642', 1),
('2dda2c5a-e6df-40d8-b392-156b7c22c80f', '63ed593a29ff910b12a10e73832d2d4bab957ec4fccf2c2444dcea9fed316ccd', '2024-11-19 04:46:43.077', '20241115025429_init', NULL, NULL, '2024-11-19 04:46:42.943', 1),
('49acf471-43b1-44d7-b4c7-0833296aefc5', 'c50821a0b769a3624e2ce4115b68728ecb74251dae73eb265e23c331c98234b6', '2024-11-19 04:46:42.877', '20241103140254_new', NULL, NULL, '2024-11-19 04:46:42.808', 1),
('83f01449-3dd2-4741-9f7e-db2c39ff3fa8', '03562e428ec085481947ec73bb6e0856f94c6406fe3343455eea5ce76dba8875', '2024-11-19 04:46:43.151', '20241115072144_init', NULL, NULL, '2024-11-19 04:46:43.083', 1),
('9c3cf015-d84f-4138-8fca-31866c8f722d', '4529a2e6606b1d80bbf65bd21de8d592e8e2826d1d563469d689c506b15afdd9', '2024-11-19 04:49:25.957', '20241119044925_update_guru', NULL, NULL, '2024-11-19 04:49:25.725', 1),
('b433dd2c-5e67-4f26-b675-25d49e587deb', '7bcd6d8d297e2466e68a35a36bbfef6601178566d1b585bff5c5178a36e618f4', '2024-11-19 04:46:42.938', '20241115025051_init', NULL, NULL, '2024-11-19 04:46:42.914', 1),
('c570aab0-9d3a-4453-a3a8-6a0eccfaff06', '031d24bf86b2a3a226a87b55db3b95ff1033255b40ffa5dfcb088b704b0a3c79', '2024-11-19 04:46:42.909', '20241103142216_add_enum_tingkat_kelas', NULL, NULL, '2024-11-19 04:46:42.882', 1),
('eccb7915-7393-46bf-b88d-6c3e5effccc1', 'a9e57bdba800f0f67167a3cd68136cb847a1c83bb919476bad9865a19fd25370', '2024-11-19 04:46:46.408', '20241119044646_update', NULL, NULL, '2024-11-19 04:46:46.366', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BlacklistedToken`
--
ALTER TABLE `BlacklistedToken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `BlacklistedToken_token_key` (`token`);

--
-- Indexes for table `Guru`
--
ALTER TABLE `Guru`
  ADD PRIMARY KEY (`id_guru`),
  ADD UNIQUE KEY `Guru_no_telepon_key` (`no_telepon`),
  ADD UNIQUE KEY `Guru_email_key` (`email`);

--
-- Indexes for table `Jadwal`
--
ALTER TABLE `Jadwal`
  ADD PRIMARY KEY (`id_jadwal`);

--
-- Indexes for table `Kehadiran`
--
ALTER TABLE `Kehadiran`
  ADD PRIMARY KEY (`id_kehadiran`);

--
-- Indexes for table `Kelas`
--
ALTER TABLE `Kelas`
  ADD PRIMARY KEY (`id_kelas`);

--
-- Indexes for table `MataPelajaran`
--
ALTER TABLE `MataPelajaran`
  ADD PRIMARY KEY (`id_mata_pelajaran`);

--
-- Indexes for table `Nilai`
--
ALTER TABLE `Nilai`
  ADD PRIMARY KEY (`id_nilai`);

--
-- Indexes for table `Siswa`
--
ALTER TABLE `Siswa`
  ADD PRIMARY KEY (`id_siswa`),
  ADD UNIQUE KEY `Siswa_email_key` (`email`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `User_username_key` (`username`),
  ADD KEY `User_id_siswa_fkey` (`id_siswa`),
  ADD KEY `User_id_guru_fkey` (`id_guru`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BlacklistedToken`
--
ALTER TABLE `BlacklistedToken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Guru`
--
ALTER TABLE `Guru`
  MODIFY `id_guru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Jadwal`
--
ALTER TABLE `Jadwal`
  MODIFY `id_jadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Kehadiran`
--
ALTER TABLE `Kehadiran`
  MODIFY `id_kehadiran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Kelas`
--
ALTER TABLE `Kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `MataPelajaran`
--
ALTER TABLE `MataPelajaran`
  MODIFY `id_mata_pelajaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Nilai`
--
ALTER TABLE `Nilai`
  MODIFY `id_nilai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Siswa`
--
ALTER TABLE `Siswa`
  MODIFY `id_siswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `Guru` (`id_guru`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `User_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Siswa` (`id_siswa`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

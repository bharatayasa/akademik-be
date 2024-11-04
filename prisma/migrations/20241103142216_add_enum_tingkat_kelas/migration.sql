/*
  Warnings:

  - Added the required column `semester` to the `Kelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tingkat` to the `Kelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tingkat` to the `Nilai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Kelas` ADD COLUMN `semester` ENUM('Ganjil', 'Genap') NOT NULL,
    ADD COLUMN `tingkat` ENUM('X', 'XI', 'XII') NOT NULL;

-- AlterTable
ALTER TABLE `Nilai` ADD COLUMN `semester` ENUM('Ganjil', 'Genap') NOT NULL,
    ADD COLUMN `tingkat` ENUM('X', 'XI', 'XII') NOT NULL;

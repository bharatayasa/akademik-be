import { IsInt, IsString, IsOptional, IsEnum, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';

enum JenisKelamin {
    LakiLaki,
    Perempuan
}

enum siswaStatus {
    Aktif,
    Lulus,
    Dropout
}

export class CreateSiswaDto {
    @IsOptional()
    @IsInt()
    id_siswa?: number;

    @IsOptional()
    @IsInt()
    id_kelas?: number;

    @IsDateString()
    @IsNotEmpty()
    tanggal_lahir: string;

    @IsString()
    @IsNotEmpty()
    jenis_kelamin: JenisKelamin

    @IsString()
    @IsNotEmpty()
    alamat: string;

    @IsString()
    @IsNotEmpty()
    no_telepon: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    status_siswa: siswaStatus;
}

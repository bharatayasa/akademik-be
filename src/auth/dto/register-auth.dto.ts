import { IsInt, IsOptional, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export enum Role {
    ADMIN = 'admin',
    GURU = 'guru',
    SISWA = 'siswa'
}

export class RgisterAuthDTO {
    @IsOptional()
    @IsInt()
    id_siswa?: number;

    @IsOptional()
    @IsInt()
    id_guru?: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password_hash: string;

    @IsEnum(Role)
    role: Role;
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { SiswaModule } from './siswa/siswa.module';
import { GuruModule } from './guru/guru.module';
import { JadwalModule } from './jadwal/jadwal.module';
import { KelasModule } from './kelas/kelas.module';
import { PelajaranModule } from './pelajaran/pelajaran.module';
import { NilaiModule } from './nilai/nilai.module';
import { KehadiranModule } from './kehadiran/kehadiran.module';

@Module({
  imports: [UsersModule, AuthModule, SiswaModule, GuruModule, JadwalModule, KelasModule, PelajaranModule, NilaiModule, KehadiranModule],
  controllers: [
    AppController,
    UsersController
  ],
  providers: [
    AppService, 
    UsersService, 
    PrismaService, 
    AuthService, 
    JwtService
  ],
})
export class AppModule {}

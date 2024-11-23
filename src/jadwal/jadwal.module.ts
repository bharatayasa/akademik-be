import { Module } from '@nestjs/common';
import { JadwalService } from './jadwal.service';
import { JadwalController } from './jadwal.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [JadwalController],
  providers: [
    JadwalService, 
    PrismaService, 
    JwtService, 
    AuthService
  ],
})
export class JadwalModule {}

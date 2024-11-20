import { Module } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { SiswaController } from './siswa.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [SiswaController],
  providers: [
    SiswaService, 
    PrismaService, 
    JwtService, 
    AuthService
  ],
})
export class SiswaModule {}

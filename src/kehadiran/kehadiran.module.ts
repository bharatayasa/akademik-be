import { Module } from '@nestjs/common';
import { KehadiranService } from './kehadiran.service';
import { KehadiranController } from './kehadiran.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [KehadiranController],
  providers: [
    KehadiranService, 
    PrismaService, 
    AuthService, 
    JwtService
  ],
})
export class KehadiranModule {}

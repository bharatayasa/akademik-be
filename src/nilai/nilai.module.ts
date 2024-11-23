import { Module } from '@nestjs/common';
import { NilaiService } from './nilai.service';
import { NilaiController } from './nilai.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [NilaiController],
  providers: [
    NilaiService, 
    PrismaService, 
    AuthService, 
    JwtService
  ],
})
export class NilaiModule {}

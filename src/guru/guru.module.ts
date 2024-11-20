import { Module } from '@nestjs/common';
import { GuruService } from './guru.service';
import { GuruController } from './guru.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [GuruController],
  providers: [
    GuruService, 
    PrismaService, 
    AuthService, 
    JwtService
  ],
})
export class GuruModule {}

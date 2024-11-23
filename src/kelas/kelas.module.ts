import { Module } from '@nestjs/common';
import { KelasService } from './kelas.service';
import { KelasController } from './kelas.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [KelasController],
  providers: [
    KelasService, 
    PrismaService, 
    JwtService, 
    AuthService
  ],
})
export class KelasModule {}

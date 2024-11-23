import { Module } from '@nestjs/common';
import { PelajaranService } from './pelajaran.service';
import { PelajaranController } from './pelajaran.controller';
import { PrismaService } from 'prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PelajaranController],
  providers: [
    PelajaranService, 
    PrismaService, 
    AuthService, 
    JwtService
  ],
})
export class PelajaranModule {}

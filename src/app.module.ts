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

@Module({
  imports: [UsersModule, AuthModule],
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

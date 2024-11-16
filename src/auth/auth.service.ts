import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RgisterAuthDTO } from './dto/register-auth.dto';
import { LoginAuthDTO } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    async validateToken(token: string): Promise<any> {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET is missing or undefined');
        }

        const blacklistedToken = await this.prisma.blacklistedToken.findUnique({
            where: { token },
        });

        if (blacklistedToken) {
            throw new UnauthorizedException('Token has been blacklisted');
        }

        try {
            const decoded = this.jwtService.verify(token, { secret });
            return decoded;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

async register(registerDTO: RgisterAuthDTO): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDTO.password_hash, saltRounds);

    const userRegister = await this.prisma.user.create({
        data: {
            id_siswa      : registerDTO.id_siswa || null,
            id_guru       : registerDTO.id_guru || null,
            username      : registerDTO.username, 
            role          : registerDTO.role || "siswa",
            password_hash : hashedPassword
        }
    });

    return userRegister;
}

    async login(loginDTO: LoginAuthDTO): Promise<{ access_token: string; user: any }> {
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const user = await this.prisma.user.findFirst({
            where: { 
                username: loginDTO.username 
            },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(loginDTO.password_hash, user.password_hash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = { id_user: user.id_user, username: user.username, role: user.role };
        const access_token = this.jwtService.sign(payload, { secret: jwtSecret });

        return { 
            user: {
                username: user.username,
                role: user.role
            },
            access_token
        };
    }

    async logout(token: string): Promise<{ id: number; createdAt: Date;}> {
        const existingToken = await this.prisma.blacklistedToken.findUnique({
            where: { token },
        });
    
        if (existingToken) {
            return {
                id: existingToken.id, 
                createdAt: existingToken.createdAt 
            };
        }
    
        const blacklistedToken = await this.prisma.blacklistedToken.create({
            data: { token },
        });
    
        return blacklistedToken
    }
}

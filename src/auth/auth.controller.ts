import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { RgisterAuthDTO } from './dto/register-auth.dto';
import { Response } from 'express';
import { LoginAuthDTO } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(
        @Body() body: RgisterAuthDTO,
        @Res() res: Response
    ) {
        try {
            const userRegis = await this.authService.register(body);

            const formatData = {
                id_siswa      : userRegis.id_siswa || null,
                id_guru       : userRegis.id_guru || null,
                username      : userRegis.username, 
                role          : userRegis.role
            }

            return res.status(HttpStatus.CREATED).json({
                message: 'User registered successfully',
                data: formatData,
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to register user',
                error: error.message,
            });
        }
    }

    @Post('login')
    async login(
        @Body() body: LoginAuthDTO,
        @Res() res: Response,
    ) {
        try {
            const { access_token, user } = await this.authService.login(body);
            return res.status(HttpStatus.OK).json({
                message: 'Login successful',
                data: {
                    user: user,
                    token: access_token
                }
            });
        } catch (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Login failed',
                error: error.message,
            });
        }
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        try {
            interface CustomHeaders extends Headers {
                authorization?: string;
            }
            const token = (req.headers as CustomHeaders).authorization?.split(' ')[1];
            if (!token) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Token is missing',
                });
            }

            const blacklistData = await this.authService.logout(token)

            const formatLogout = {
                logoutAt : moment(blacklistData.createdAt).format('YYYY-MM-DD'),
            }

            return res.status(HttpStatus.OK).json({
                message: "Logout success", 
                data: formatLogout
            })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Logout failed',
                error: error.message,
            });
        }
    }
}

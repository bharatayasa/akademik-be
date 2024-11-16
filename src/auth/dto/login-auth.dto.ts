import { IsString, IsNotEmpty } from 'class-validator';

export class LoginAuthDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password_hash: string;
}

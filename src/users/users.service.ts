import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService){}
  async create(createUserDto: CreateUserDto): Promise<User>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password_hash, saltRounds);

    const newUser = await this.prisma.user.create({
      data: {
        id_siswa      : createUserDto.id_siswa || null,
        id_guru       : createUserDto.id_guru || null,
        username      : createUserDto.username, 
        role          : createUserDto.role, 
        password_hash : hashedPassword
      }
    })

    return newUser;
  }

  async findAll() :Promise<User[]>{
    const findAllUser = await this.prisma.user.findMany({
      where: {
        deleted_at: null,
      }
    })

    return findAllUser
  }

  async findOne(id: number) {
    const findUserById = await this.prisma.user.findFirst({
      where: {
        deleted_at: null,
        id_user: id,
      },
    });
  
    return findUserById;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

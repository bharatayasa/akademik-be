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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(updateUserDto.password_hash, saltRounds);

    const updateUser = await this.prisma.user.update({
      where: {id_user: id},
      data: {
        id_siswa      : updateUserDto.id_siswa || null,
        id_guru       : updateUserDto.id_guru || null,
        username      : updateUserDto.username, 
        role          : updateUserDto.role, 
        password_hash : hashedPassword
      }
    })

    return updateUser;
  }

  async remove(id: number) {
    const deleteUser = await this.prisma.user.update({
      where: {
        id_user : id
      }, 
      data: {
        deleted_at: new Date()
      }
    })

    return deleteUser
  }
}

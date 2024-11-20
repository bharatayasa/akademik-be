import { Injectable } from '@nestjs/common';
import { CreateGuruDto } from './dto/create-guru.dto';
import { UpdateGuruDto } from './dto/update-guru.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Guru, User } from '@prisma/client';

@Injectable()
export class GuruService {
  constructor(private prisma: PrismaService){}
  
  create(createGuruDto: CreateGuruDto) {
    return 'This action adds a new guru';
  }

  async findAll():Promise<(Guru & { users: User[]})[]> {
    const findAllGuru = await this.prisma.guru.findMany({
      where: {
        deleted_at: null
      },
      include: {
        users: true
      }
    })

    return findAllGuru;
  }

  findOne(id: number) {
    return `This action returns a #${id} guru`;
  }

  update(id: number, updateGuruDto: UpdateGuruDto) {
    return `This action updates a #${id} guru`;
  }

  remove(id: number) {
    return `This action removes a #${id} guru`;
  }
}

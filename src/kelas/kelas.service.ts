import { Injectable } from '@nestjs/common';
import { CreateKelaDto } from './dto/create-kela.dto';
import { UpdateKelaDto } from './dto/update-kela.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Kelas, Guru } from '@prisma/client';

@Injectable()
export class KelasService {
  constructor(private prisma: PrismaService){}
  create(createKelaDto: CreateKelaDto) {
    return 'This action adds a new kela';
  }

  async findAll(): Promise<(Kelas & { guru: Guru })[]> {
    const getAllKelas = await this.prisma.kelas.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        guru: true,
      },
    });

    return getAllKelas;
}

  findOne(id: number) {
    return `This action returns a #${id} kela`;
  }

  update(id: number, updateKelaDto: UpdateKelaDto) {
    return `This action updates a #${id} kela`;
  }

  remove(id: number) {
    return `This action removes a #${id} kela`;
  }
}

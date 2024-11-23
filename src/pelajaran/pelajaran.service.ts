import { Injectable } from '@nestjs/common';
import { CreatePelajaranDto } from './dto/create-pelajaran.dto';
import { UpdatePelajaranDto } from './dto/update-pelajaran.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MataPelajaran } from '@prisma/client';

@Injectable()
export class PelajaranService {
  constructor(private prisma: PrismaService){}
  create(createPelajaranDto: CreatePelajaranDto) {
    return 'This action adds a new pelajaran';
  }

  async findAll():Promise<MataPelajaran[]> {
    const getAllPelajaran = await this.prisma.mataPelajaran.findMany({
      where: {
        deleted_at: null
      }
    })

    return getAllPelajaran;
  }

  findOne(id: number) {
    return `This action returns a #${id} pelajaran`;
  }

  update(id: number, updatePelajaranDto: UpdatePelajaranDto) {
    return `This action updates a #${id} pelajaran`;
  }

  remove(id: number) {
    return `This action removes a #${id} pelajaran`;
  }
}

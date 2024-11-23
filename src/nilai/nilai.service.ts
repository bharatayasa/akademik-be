import { Injectable } from '@nestjs/common';
import { CreateNilaiDto } from './dto/create-nilai.dto';
import { UpdateNilaiDto } from './dto/update-nilai.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MataPelajaran, Nilai, Siswa } from '@prisma/client';
import { Prisma } from '@prisma/client'

@Injectable()
export class NilaiService {
  constructor(private prisma: PrismaService){}
  create(createNilaiDto: CreateNilaiDto) {
    return 'This action adds a new nilai';
  }

  async findAll(): Promise<(Nilai & { siswa: Siswa; mataPelajaran: MataPelajaran })[]> {
    const getAllNilai = await this.prisma.nilai.findMany({
      where: {
        deleted_at: null
      },
      include: {
        siswa: true,
        mata_pelajaran: true,
      }
    });
  
    return getAllNilai.map(nilai => ({
      ...nilai, 
      siswa: nilai.siswa, 
      mataPelajaran: nilai.mata_pelajaran
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} nilai`;
  }

  update(id: number, updateNilaiDto: UpdateNilaiDto) {
    return `This action updates a #${id} nilai`;
  }

  remove(id: number) {
    return `This action removes a #${id} nilai`;
  }
}

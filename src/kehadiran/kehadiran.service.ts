import { Injectable } from '@nestjs/common';
import { CreateKehadiranDto } from './dto/create-kehadiran.dto';
import { UpdateKehadiranDto } from './dto/update-kehadiran.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Jadwal, Kehadiran, Siswa } from '@prisma/client';

@Injectable()
export class KehadiranService {
  constructor(private prisma: PrismaService){}
  create(createKehadiranDto: CreateKehadiranDto) {
    return 'This action adds a new kehadiran';
  }

  async findAll(): Promise<(Kehadiran & {siswa: Siswa; jadwal: Jadwal})[]> {
    const getAllKehadiran = await this.prisma.kehadiran.findMany({
      where: {
        deleted_at: null
      }, 
      include: {
        siswa: true, 
        jadwal: true
      }
    })

    return getAllKehadiran;
  }

  findOne(id: number) {
    return `This action returns a #${id} kehadiran`;
  }

  update(id: number, updateKehadiranDto: UpdateKehadiranDto) {
    return `This action updates a #${id} kehadiran`;
  }

  remove(id: number) {
    return `This action removes a #${id} kehadiran`;
  }
}

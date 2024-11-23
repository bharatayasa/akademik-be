import { Injectable } from '@nestjs/common';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';
import { Guru, Jadwal, Kelas, MataPelajaran } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class JadwalService {
  constructor(private prisma: PrismaService){}
  create(createJadwalDto: CreateJadwalDto) {
    return 'This action adds a new jadwal';
  }

  async findAll(): Promise<(Jadwal & { kelas: Kelas; mataPelajaran: MataPelajaran; guru: Guru})[]> {
    const findAllJadwal = await this.prisma.jadwal.findMany({
      where: {
        deleted_at: null
      }, 
      include: {
        kelas: true,
        mata_pelajaran: true,
        guru: true
      },
    })

    return findAllJadwal.map(jadwal => ({
      ...jadwal,
      mataPelajaran: jadwal.mata_pelajaran,
      kelas: jadwal.kelas, 
      guru: jadwal.guru
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} jadwal`;
  }

  update(id: number, updateJadwalDto: UpdateJadwalDto) {
    return `This action updates a #${id} jadwal`;
  }

  remove(id: number) {
    return `This action removes a #${id} jadwal`;
  }
}

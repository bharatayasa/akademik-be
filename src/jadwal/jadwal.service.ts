import { Injectable } from '@nestjs/common';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';

@Injectable()
export class JadwalService {
  create(createJadwalDto: CreateJadwalDto) {
    return 'This action adds a new jadwal';
  }

  findAll() {
    return `This action returns all jadwal`;
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

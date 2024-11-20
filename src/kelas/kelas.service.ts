import { Injectable } from '@nestjs/common';
import { CreateKelaDto } from './dto/create-kela.dto';
import { UpdateKelaDto } from './dto/update-kela.dto';

@Injectable()
export class KelasService {
  create(createKelaDto: CreateKelaDto) {
    return 'This action adds a new kela';
  }

  findAll() {
    return `This action returns all kelas`;
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

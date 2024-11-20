import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KelasService } from './kelas.service';
import { CreateKelaDto } from './dto/create-kela.dto';
import { UpdateKelaDto } from './dto/update-kela.dto';

@Controller('kelas')
export class KelasController {
  constructor(private readonly kelasService: KelasService) {}

  @Post()
  create(@Body() createKelaDto: CreateKelaDto) {
    return this.kelasService.create(createKelaDto);
  }

  @Get()
  findAll() {
    return this.kelasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kelasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKelaDto: UpdateKelaDto) {
    return this.kelasService.update(+id, updateKelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kelasService.remove(+id);
  }
}

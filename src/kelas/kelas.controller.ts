import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { KelasService } from './kelas.service';
import { CreateKelaDto } from './dto/create-kela.dto';
import { UpdateKelaDto } from './dto/update-kela.dto';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('kelas')
export class KelasController {
  constructor(private readonly kelasService: KelasService) {}

  @Post()
  
  create(@Body() createKelaDto: CreateKelaDto) {
    return this.kelasService.create(createKelaDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const getAllKelas = await this.kelasService.findAll();

      const formatData = getAllKelas.map(kelas => ({
        id_kelas: kelas.id_kelas, 
        id_guru: kelas.id_guru, 
        nama_kelas: kelas.nama_kelas, 
        tingkat: kelas.tingkat, 
        semester: kelas.semester,
        created_at: moment(kelas.created_at).format("YYYY-MM-DD"),
        updated_at: moment(kelas.updated_at).format("YYYY-MM-DD"),
          guru: {
            id_guru: kelas.guru?.id_guru, 
            nama: kelas.guru?.nama, 
            email: kelas.guru?.email,
        }
      }))

      return res.status(HttpStatus.OK).json({
        message: "success to get all data kelas", 
        data: formatData
      })

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "internal server error", 
        error: error
      })
    }
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

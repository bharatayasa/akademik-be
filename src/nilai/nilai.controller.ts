import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { NilaiService } from './nilai.service';
import { CreateNilaiDto } from './dto/create-nilai.dto';
import { UpdateNilaiDto } from './dto/update-nilai.dto';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('nilai')
export class NilaiController {
  constructor(private readonly nilaiService: NilaiService) {}

  @Post()
  create(@Body() createNilaiDto: CreateNilaiDto) {
    return this.nilaiService.create(createNilaiDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const getAllNilai = await this.nilaiService.findAll();

      const formatData = getAllNilai.map(nilai => ({
        id_nilai: nilai.id_nilai, 
        id_siswa: nilai.id_siswa, 
        id_mata_pelajaran: nilai.id_mata_pelajaran, 
        nilai: nilai.nilai, 
        tingkat: nilai.tingkat, 
        semester: nilai.semester, 
        created_at: moment(nilai.created_at).format("YYYY-MM-DD"),
        updated_at: moment(nilai.updated_at).format("YYYY-MM-DD"),
        siswa: {
          nama: nilai.siswa.nama, 
          email: nilai.siswa.email
        }, 
        pelajaran: {
          nama_mata_pelajaran: nilai.mataPelajaran.nama_mata_pelajaran, 
          deskripsi: nilai.mataPelajaran.deskripsi
        }
      }))

      return res.status(HttpStatus.OK).json({
        message: "success to get all data", 
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
    return this.nilaiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNilaiDto: UpdateNilaiDto) {
    return this.nilaiService.update(+id, updateNilaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nilaiService.remove(+id);
  }
}

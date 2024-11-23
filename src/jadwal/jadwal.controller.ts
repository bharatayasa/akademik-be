import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, UseGuards } from '@nestjs/common';
import { JadwalService } from './jadwal.service';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('jadwal')
export class JadwalController {
  constructor(private readonly jadwalService: JadwalService) {}

  @Post()
  create(@Body() createJadwalDto: CreateJadwalDto) {
    return this.jadwalService.create(createJadwalDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async findAll(@Res() res: Response, @Req() req: Request){
    try {
      const jadwalData =  await this.jadwalService.findAll();

      const formatData = jadwalData.map(jadwal => ({
        id_jadwal: jadwal.id_jadwal, 
        id_kelas: jadwal.id_kelas, 
        id_mata_pelajaran: jadwal.id_mata_pelajaran, 
        id_guru: jadwal.id_guru, 
        hari: jadwal.hari, 
        jam_mulai: moment(jadwal.jam_mulai).format("HH:mm"),
        jam_selesai: moment(jadwal.jam_selesai).format("HH:mm"),
        created_at: moment(jadwal.created_at).format("YYYY-MM-DD"),
        updated_at: moment(jadwal.updated_at).format("YYYY-MM-DD"),
          kelas: {
            nama_kelas: jadwal.kelas.nama_kelas, 
            semester: jadwal.kelas.semester
          },
          mataPelajaran: {
            nama_mata_pelajaran: jadwal.mataPelajaran?.nama_mata_pelajaran, 
            deskripsi: jadwal.mataPelajaran?.deskripsi
          }, 
          guru: {
            nama: jadwal.guru?.nama, 
            email: jadwal.guru?.email,
          }, 

      }))

      return res.status(HttpStatus.OK).json({
        message: "success to get all jadwal", 
        data: formatData
      })

    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "internal server error", 
        error: error
      })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jadwalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJadwalDto: UpdateJadwalDto) {
    return this.jadwalService.update(+id, updateJadwalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jadwalService.remove(+id);
  }
}

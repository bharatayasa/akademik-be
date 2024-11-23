import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { KehadiranService } from './kehadiran.service';
import { CreateKehadiranDto } from './dto/create-kehadiran.dto';
import { UpdateKehadiranDto } from './dto/update-kehadiran.dto';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('kehadiran')
export class KehadiranController {
  constructor(private readonly kehadiranService: KehadiranService) {}

  @Post()
  create(@Body() createKehadiranDto: CreateKehadiranDto) {
    return this.kehadiranService.create(createKehadiranDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async findAll(@Req() req: Request, @Res() res: Response) {
    const getAllKehadiran = await this.kehadiranService.findAll();

    const formatData = getAllKehadiran.map(kehadiran => ({
      id_kehadiran: kehadiran.id_kehadiran, 
      id_siswa: kehadiran.id_siswa, 
      id_jadwal: kehadiran.id_jadwal, 
      tanggal: moment(kehadiran.tanggal).format("YYYY-MM-DD"),
      status: kehadiran.status, 
      created_at: moment(kehadiran.created_at).format("YYYY-MM-DD"),
      updated_at: moment(kehadiran.updated_at).format("YYYY-MM-DD"),
      siswa: {
        nama: kehadiran.siswa.nama, 
        email: kehadiran.siswa.email
      }, 
      jadwal: {
        hari: kehadiran.jadwal.hari, 
        jam_mulai: moment(kehadiran.jadwal.jam_mulai).format("HH:mm"),
        jam_selesai: moment(kehadiran.jadwal.jam_selesai).format("HH:mm"),
      }
    }))

    return res.status(HttpStatus.OK).json({
      message: "succes to get all kehadiran", 
      data: formatData
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kehadiranService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKehadiranDto: UpdateKehadiranDto) {
    return this.kehadiranService.update(+id, updateKehadiranDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kehadiranService.remove(+id);
  }
}

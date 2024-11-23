import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { PelajaranService } from './pelajaran.service';
import { CreatePelajaranDto } from './dto/create-pelajaran.dto';
import { UpdatePelajaranDto } from './dto/update-pelajaran.dto';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('pelajaran')
export class PelajaranController {
  constructor(private readonly pelajaranService: PelajaranService) {}

  @Post()
  create(@Body() createPelajaranDto: CreatePelajaranDto) {
    return this.pelajaranService.create(createPelajaranDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const getAllPelajaran = await this.pelajaranService.findAll()

      const formatData = getAllPelajaran.map(pelajaran => ({
        id_mata_pelajaran: pelajaran.id_mata_pelajaran, 
        nama_mata_pelajaran: pelajaran.nama_mata_pelajaran, 
        deskripsi: pelajaran.deskripsi, 
        created_at: moment(pelajaran.created_at).format("YYYY-MM-DD"),
        updated_at: moment(pelajaran.updated_at).format("YYYY-MM-DD"),
      }))

      return res.status(HttpStatus.OK).json({
        message: "success to get all pelajaran", 
        data: formatData
      });

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "internal server error", 
        error: error
      })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pelajaranService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePelajaranDto: UpdatePelajaranDto) {
    return this.pelajaranService.update(+id, updatePelajaranDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pelajaranService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, UseGuards } from '@nestjs/common';
import { GuruService } from './guru.service';
import { CreateGuruDto } from './dto/create-guru.dto';
import { UpdateGuruDto } from './dto/update-guru.dto';
import { Request, Response } from 'express';
import * as moment from 'moment';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('guru')
export class GuruController {
  constructor(private readonly guruService: GuruService) {}

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async create(@Body() createGuruDto: CreateGuruDto) {
    return this.guruService.create(createGuruDto);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request) {
    try {
      const guruDatas = await this.guruService.findAll();

      if (!guruDatas) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: "data not found"
        })
      }

      const formatData = guruDatas.map(guru => ({
        id_guru: guru.id_guru, 
        nama: guru.nama, 
        tanggal_lahir: moment(guru.tanggal_lahir).format('YYYY-MM-DD'),
        jenis_kelamin: guru.jenis_kelamin,
        alamat: guru.alamat,
        no_telepon: guru.no_telepon,
        email: guru.email,
        status_guru: guru.status_guru,
        
        user_data: guru.users
        ? guru.users.map(user => ({
            id_user: user.id_user,
            username: user.username,
            role: user.role,
            created_at: moment(user.created_at).format('YYYY-MM-DD'),
            updated_at: moment(user.updated_at).format('YYYY-MM-DD'),
            deleted_at: user.deleted_at
              ? moment(user.deleted_at).format('YYYY-MM-DD')
              : null,
          }))
        : null,

        date_time: {
          created_at: moment(guru.created_at).format('YYYY-MM-DD'),
          updated_at: moment(guru.updated_at).format('YYYY-MM-DD'),
          deleted_at: guru.deleted_at
              ? moment(guru.deleted_at).format('YYYY-MM-DD')
              : null,
        }
      }))

      return res.status(HttpStatus.OK).json({
        message: "success to get all guru data", 
        data: formatData
      })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guruService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuruDto: UpdateGuruDto) {
    return this.guruService.update(+id, updateGuruDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guruService.remove(+id);
  }
}

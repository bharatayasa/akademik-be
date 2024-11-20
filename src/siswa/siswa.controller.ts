import { Controller, Get, HttpStatus, Param, Res, UseGuards } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { Response } from 'express';
import * as moment from 'moment';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('siswa')
export class SiswaController {
  constructor(private readonly siswaService: SiswaService) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async getAllSiswa(@Res() res: Response): Promise<any> {
    try {
      const getAllSiswa = await this.siswaService.findAll();

    if (getAllSiswa.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "data not found"
      })
    }

    const formatData = getAllSiswa.map(siswa => ({
      id_siswa: siswa.id_siswa,
      id_kelas: siswa.id_kelas,
      tanggal_lahir: moment(siswa.tanggal_lahir).format('YYYY-MM-DD'),
      jenis_kelamin: siswa.jenis_kelamin,
      alamat: siswa.alamat,
      no_telepon: siswa.no_telepon,
      email: siswa.email,
      status_siswa: siswa.status_siswa,

      user_data: siswa.users
        ? siswa.users.map(user => ({
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
        created_at: moment(siswa.created_at).format('YYYY-MM-DD'),
        updated_at: moment(siswa.updated_at).format('YYYY-MM-DD'),
        deleted_at: siswa.deleted_at
            ? moment(siswa.deleted_at).format('YYYY-MM-DD')
            : null,
      }
    }));

    return res.status(HttpStatus.OK).json({
        message: 'success to get all siswa',
        data: formatData,
    });
    } catch (error) {
      console.error("Error fetching siswa");
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error.message,
      });
    }
    
  }

  @Get('/:id_siswa')
  @Roles('admin')
  @UseGuards(AuthGuard)
  async getSiswaById(@Param('id_siswa') id_siswa: string, @Res() res: Response):Promise<any>{
    try {
      const idToString = Number(id_siswa)
      const getSiswaById = await this.siswaService.findSiswaById(idToString)

      const formatData = ({
        id_siswa: getSiswaById[0].id_siswa,
        id_kelas: getSiswaById[0].id_kelas,
        tanggal_lahir: moment(getSiswaById[0].tanggal_lahir).format('YYYY-MM-DD'),
        jenis_kelamin: getSiswaById[0].jenis_kelamin,
        alamat: getSiswaById[0].alamat,
        no_telepon: getSiswaById[0].no_telepon,
        email: getSiswaById[0].email,
        status_siswa: getSiswaById[0].status_siswa,
  
        user_data: getSiswaById[0].users
          ? getSiswaById[0].users.map(user => ({
              id_user: user.id_user,
              username: user.username,
              role: user.role,
              created_at: moment(user.created_at).format('YYYY-MM-DD'),
              updated_at: moment(user.updated_at).format('YYYY-MM-DD'),
            }))
          : null,
  
        date_time: {
          created_at: moment(getSiswaById[0].created_at).format('YYYY-MM-DD'),
          updated_at: moment(getSiswaById[0].updated_at).format('YYYY-MM-DD'),
        }
      });

      return res.status(HttpStatus.OK).json({
        message: `success to get siswa by id of ${idToString}`, 
        data: formatData
      })
    } catch (error) {
      console.error("Error fetching siswa by id");
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

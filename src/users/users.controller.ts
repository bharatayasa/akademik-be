import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import * as moment from 'moment';
import { Roles } from '../auth/guard/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createUser = await this.usersService.create(createUserDto);

    const formData = {
      id_siswa    : createUser.id_siswa,
      id_guru     : createUser.id_guru,
      username    : createUser.username,
      role        : createUser.role
    }

    return res.status(HttpStatus.CREATED).json({
      message: "success to add data", 
      data: formData
    })
  }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard) 
  async findAll(@Res() res: Response) {
    try {
      const usersData = await this.usersService.findAll();
  
      if (!usersData || usersData.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: "Data not found",
          data: [],
        });
      }
  
      const formatData = usersData.map(userData => {
        const baseData = {
          id_user: userData.id_user,
          username: userData.username,
          role: userData.role,
          date_and_time: {
            created_at: moment(userData.created_at).format("YYYY-MM-DD"),
            updated_at: moment(userData.updated_at).format("YYYY-MM-DD"),
          },
        };
  
        if (userData.role === "guru" && userData.guru) {
          return {
            ...baseData,
            detail: {
              id_guru: userData.guru.id_guru,
              nama: userData.guru.nama,
              alamat: userData.guru.alamat,
              no_telepon: userData.guru.no_telepon,
              email: userData.guru.email,
              status_guru: userData.guru.status_guru,
            },
          };
        }
  
        if (userData.role === "siswa" && userData.siswa) {
          return {
            ...baseData,
            detail: {
              id_siswa: userData.siswa.id_siswa,
              nama: userData.siswa.nama,
              alamat: userData.siswa.alamat,
              no_telepon: userData.siswa.no_telepon,
              email: userData.siswa.email,
              status_siswa: userData.siswa.status_siswa,
            },
          };
        }
  
        return baseData;
      });
  
      return res.status(HttpStatus.OK).json({
        message: "Success to get all data",
        data: formatData,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error.message || error,
      });
    }
  }  

  @Get(':id')
  @Roles('admin')
  @UseGuards(AuthGuard) 
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const idToNumber = Number(id);
  
      if (isNaN(idToNumber)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "Invalid ID format, must be a number",
        });
      }
  
      const userData = await this.usersService.findOne(idToNumber);
  
      if (!userData) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: `User with ID ${idToNumber} not found`,
        });
      }
  
      const formatData = {
        id_user   : userData.id_user,
        username  : userData.username,
        role      : userData.role,
        created_at: moment(userData.created_at).format('YYYY-MM-DD'),
        updated_at: moment(userData.updated_at).format('YYYY-MM-DD'),
      };
  
      return res.status(HttpStatus.OK).json({
        message: "Success to get data by ID",
        data: formatData,
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard) 
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Res() res: Response) {
    try {
      const idToNumber = Number(id)
      const updateUser = await this.usersService.update(idToNumber, updateUserDto);

      if (isNaN(idToNumber)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "Invalid ID format, must be a number",
        });
      }

      const formData = {
        id_siswa    : updateUser.id_siswa,
        id_guru     : updateUser.id_guru,
        username    : updateUser.username,
        role        : updateUser.role
      }

      return res.status(HttpStatus.OK).json({
        message: "success to update user", 
        data: formData
      })

    } catch (error) {
      console.error("Error fetching user by ID:", error);
  
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard) 
  async remove(@Param('id') id: string, @Res() res: Response) {
    const idToNumber = Number(id)
    const deleteUser = await this.usersService.remove(idToNumber);

    if (isNaN(idToNumber)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Invalid ID format, must be a number",
      });
    }

    if (!idToNumber) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "ID not found"
      })
    }

    const formatData = {
      deleted_at: deleteUser.deleted_at ? moment(deleteUser.deleted_at).format('YYYY-MM-DD') : null,
    }

    return res.status(HttpStatus.OK).json({
      message: "user successfully deleted", 
      data: formatData
    })
  }
}

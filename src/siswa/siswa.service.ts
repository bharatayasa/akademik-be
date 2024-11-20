import { Injectable } from '@nestjs/common';
import { Siswa, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SiswaService {
    constructor(private prisma: PrismaService){}
    async findAll(): Promise<(Siswa & { users: User[] })[]> {
        const findAllSiswa = await this.prisma.siswa.findMany({
            where: {
                deleted_at: null
            },
            include: {
                users: true
            }
        })
    
        return findAllSiswa
    }

    async findSiswaById(id_siswa: number): Promise<(Siswa & { users: User[] })[]> {
        const findAllSiswa = await this.prisma.siswa.findMany({
            where: {
                id_siswa: id_siswa,
                deleted_at: null
            },
            include: {
                users: true
            }
        })
    
        return findAllSiswa
    }
    
    async createSiswa(id_siswa: number): Promise<(Siswa & { users: User[] })[]> {
        const findAllSiswa = await this.prisma.siswa.findMany({
            where: {
                id_siswa: id_siswa,
                deleted_at: null
            },
            include: {
                users: true
            }
        })
    
        return findAllSiswa
    }
}

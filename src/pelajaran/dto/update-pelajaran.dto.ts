import { PartialType } from '@nestjs/mapped-types';
import { CreatePelajaranDto } from './create-pelajaran.dto';

export class UpdatePelajaranDto extends PartialType(CreatePelajaranDto) {}

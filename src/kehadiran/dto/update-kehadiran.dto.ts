import { PartialType } from '@nestjs/mapped-types';
import { CreateKehadiranDto } from './create-kehadiran.dto';

export class UpdateKehadiranDto extends PartialType(CreateKehadiranDto) {}

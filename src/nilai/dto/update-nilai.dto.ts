import { PartialType } from '@nestjs/mapped-types';
import { CreateNilaiDto } from './create-nilai.dto';

export class UpdateNilaiDto extends PartialType(CreateNilaiDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateKelaDto } from './create-kela.dto';

export class UpdateKelaDto extends PartialType(CreateKelaDto) {}

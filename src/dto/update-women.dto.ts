import { PartialType } from '@nestjs/mapped-types';
import { CreateWomenDto } from './create-women.dto';

export class UpdateWomenDto extends PartialType(CreateWomenDto) {}

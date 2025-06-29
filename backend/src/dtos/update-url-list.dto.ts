import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlListDto } from './create-url-list.dto';

export class UpdateUrlListDto extends PartialType(CreateUrlListDto) {}

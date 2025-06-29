import { IsOptional, IsString } from 'class-validator';

export class CreateUrlListDto {
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  title?: string;
}

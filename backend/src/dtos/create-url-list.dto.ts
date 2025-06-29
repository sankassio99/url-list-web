import { IsOptional, IsString } from 'class-validator';

export class CreateUrlListDto {
  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  title: string;
}

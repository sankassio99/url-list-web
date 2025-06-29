import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  order: number;

  @IsString()
  urlListId: string;
}

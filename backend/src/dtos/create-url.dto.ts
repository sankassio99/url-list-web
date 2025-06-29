import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    description: 'The URL to be added',
    example: 'https://github.com',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'The title of the URL',
    example: 'GitHub',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'A brief description of the URL',
    example: 'A platform for version control and collaboration',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The order of the URL in the list',
    example: 1,
  })
  @IsNumber()
  order: number;

  @ApiProperty({
    description: 'The ID of the URL list to which this URL belongs',
    example: 'urlListId123',
  })
  @IsString()
  urlListId: string;
}

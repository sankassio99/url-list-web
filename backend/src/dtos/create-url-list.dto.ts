import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUrlListDto {
  @ApiProperty({
    description: 'The slug of the link unique identifier for the URL list',
    example: 'As4Fas1',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({
    description: 'The title of the link',
    example: 'GitHub',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}

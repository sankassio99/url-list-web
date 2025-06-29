import { ApiProperty } from '@nestjs/swagger';
import { UrlDto } from './url.dto';

export class UrlListDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;
    @ApiProperty({
        description: 'The slug of the link unique identifier for the URL list',
        example: 'As4Fas1',
    })
    slug: string;
    @ApiProperty({
        description: 'The title of the link',
        example: 'GitHub',
    })
    title?: string;
    @ApiProperty({
        description: 'The date when the URL list was created',
        example: '2023-10-01T12:00:00Z',
    })
    createdAt: Date;
    @ApiProperty({
        description: 'The date when the URL list was last updated',
        example: '2023-10-01T12:00:00Z',
    })
    updatedAt: Date;
    @ApiProperty({
        type: [UrlDto],
    })
    urls: UrlDto[];
}

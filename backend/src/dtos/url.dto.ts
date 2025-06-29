import { ApiProperty } from '@nestjs/swagger';

export class UrlDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: 'The URL of the link',
        example: 'https://www.example.com',
    })
    url: string;

    @ApiProperty({
        description: 'The slug of the URL',
        example: 'example-slug',
    })
    title?: string;

    @ApiProperty({
        description: 'A brief description of the URL',
        example: 'This is an example URL',
    })
    description?: string;

    @ApiProperty({
        description: 'The order of the URL in the list',
        example: 1,
    })
    order: number;

    @ApiProperty({
        description: 'The date when the URL was created',
        example: '2023-10-01T12:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The date when the URL was last updated',
        example: '2023-10-01T12:00:00Z',
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'The ID of the URL list to which the URL belongs',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    urlListId: string;
}

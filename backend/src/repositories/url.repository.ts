import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Url } from '../entities/url.entity';

@Injectable()
export class UrlRepository {
  constructor(private prisma: PrismaService) {}

  async create(url: Partial<Url>): Promise<Url> {
    const createdUrl = await this.prisma.url.create({
      data: {
        url: url.url ?? '',
        title: url.title ?? '',
        description: url.description ?? '',
        order: url.order ?? 0,
        urlListId: url.urlListId ?? '',
      },
    });

    return createdUrl as Url;
  }

  async findAllByListId(listId: string): Promise<Url[]> {
    const urls = await this.prisma.url.findMany({
      where: {
        urlListId: listId,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Map null fields to undefined to match Url entity type
    return urls.map((url) => ({
      ...url,
      title: url.title === null ? undefined : url.title,
      description: url.description === null ? undefined : url.description,
    }));
  }

  async findById(id: string): Promise<Url | null> {
    const url = await this.prisma.url.findUnique({
      where: { id },
    });
    if (!url) return null;
    return {
      ...url,
      title: url.title === null ? undefined : url.title,
      description: url.description === null ? undefined : url.description,
    };
  }

  async update(id: string, url: Partial<Url>): Promise<Url> {
    const updatedUrl = await this.prisma.url.update({
      where: { id },
      data: {
        url: url.url,
        title: url.title,
        description: url.description,
        order: url.order,
      },
    });

    return {
      ...updatedUrl,
      title: updatedUrl.title === null ? undefined : updatedUrl.title,
      description: updatedUrl.description === null ? undefined : updatedUrl.description,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.url.delete({
      where: { id },
    });
  }
}

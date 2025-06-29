import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UrlList } from '../entities/url-list.entity';

@Injectable()
export class UrlListRepository {
  constructor(private prisma: PrismaService) {}

  async create(urlList: Partial<UrlList>): Promise<UrlList> {
    const createdUrlList = await this.prisma.urlList.create({
      data: {
        slug: urlList.slug ?? '',
        title: urlList.title,
      },
      include: {
        urls: true,
      },
    });

    return createdUrlList as UrlList;
  }

  async findAll(): Promise<UrlList[]> {
    const urlLists = await this.prisma.urlList.findMany({
      include: {
        urls: true,
      },
    });

    return urlLists as UrlList[];
  }

  async findById(id: string): Promise<UrlList | null> {
    const urlList = await this.prisma.urlList.findUnique({
      where: { id },
      include: {
        urls: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return urlList as UrlList | null;
  }

  async findBySlug(slug: string): Promise<UrlList | null> {
    const urlList = await this.prisma.urlList.findUnique({
      where: { slug },
      include: {
        urls: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return urlList as UrlList | null;
  }

  async update(id: string, urlList: Partial<UrlList>): Promise<UrlList> {
    const updatedUrl = await this.prisma.urlList.update({
      where: { id },
      data: {
        slug: urlList.slug,
        title: urlList.title,
      },
      include: {
        urls: true,
      },
    });

    return updatedUrl as UrlList;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.urlList.delete({
      where: { id },
    });
  }

  async isSlugUnique(slug: string): Promise<boolean> {
    const existingList = await this.prisma.urlList.findUnique({
      where: { slug },
    });
    return !existingList;
  }
}

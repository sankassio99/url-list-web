import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlListRepository } from '../repositories/url-list.repository';

@Injectable()
export class GetUrlListBySlugUseCase {
  constructor(private urlListRepository: UrlListRepository) {}

  async execute(slug: string) {
    const urlList = await this.urlListRepository.findBySlug(slug);
    if (!urlList) {
      throw new NotFoundException(`URL List with slug ${slug} not found`);
    }
    return urlList;
  }
}

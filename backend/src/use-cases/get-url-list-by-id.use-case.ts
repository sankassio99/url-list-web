import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlListRepository } from '../repositories/url-list.repository';

@Injectable()
export class GetUrlListByIdUseCase {
  constructor(private urlListRepository: UrlListRepository) {}

  async execute(id: string) {
    const urlList = await this.urlListRepository.findById(id);
    if (!urlList) {
      throw new NotFoundException(`URL List with ID ${id} not found`);
    }
    return urlList;
  }
}

import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class GetUrlsByListIdUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(listId: string) {
    return this.urlRepository.findAllByListId(listId);
  }
}

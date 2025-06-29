import { Injectable } from '@nestjs/common';
import { UrlListRepository } from '../repositories/url-list.repository';

@Injectable()
export class GetAllUrlListsUseCase {
  constructor(private urlListRepository: UrlListRepository) {}

  async execute() {
    return this.urlListRepository.findAll();
  }
}

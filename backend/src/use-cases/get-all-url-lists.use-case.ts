import { Injectable } from '@nestjs/common';
import { UrlListRepository } from '../repositories/url-list.repository';
import { UrlListDto } from 'src/dtos/url-list.dto';

@Injectable()
export class GetAllUrlListsUseCase {
  constructor(private urlListRepository: UrlListRepository) {}

  async execute() : Promise<UrlListDto[]> {
    const urlLists = await this.urlListRepository.findAll();
    return urlLists as UrlListDto[];
  }
}

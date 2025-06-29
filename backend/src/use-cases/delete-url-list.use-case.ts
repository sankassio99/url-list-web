import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlListRepository } from '../repositories/url-list.repository';

@Injectable()
export class DeleteUrlListUseCase {
  constructor(private urlListRepository: UrlListRepository) {}

  async execute(id: string): Promise<void> {
    // Check if the list exists
    const existingList = await this.urlListRepository.findById(id);
    if (!existingList) {
      throw new NotFoundException(`URL List with ID ${id} not found`);
    }

    await this.urlListRepository.delete(id);
  }
}

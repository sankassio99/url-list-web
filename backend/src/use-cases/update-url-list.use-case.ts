import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlList } from '../entities/url-list.entity';
import { UrlListRepository } from '../repositories/url-list.repository';

@Injectable()
export class UpdateUrlListUseCase {
  constructor(private urlListRepository: UrlListRepository) {}

  async execute(id: string, data: Partial<UrlList>): Promise<UrlList> {
    // Check if the list exists
    const existingList = await this.urlListRepository.findById(id);
    if (!existingList) {
      throw new NotFoundException(`URL List with ID ${id} not found`);
    }

    // If slug is being updated, check if new slug is unique
    if (data.slug && data.slug !== existingList.slug) {
      const isUnique = await this.urlListRepository.isSlugUnique(data.slug);
      if (!isUnique) {
        // If slug is not unique, append a random string
        data.slug = `${data.slug}-${this.generateRandomString(6)}`;
      }
    }

    return this.urlListRepository.update(id, data);
  }

  private generateRandomString(length: number): string {
    // Create a random string for slug uniqueness
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }
}

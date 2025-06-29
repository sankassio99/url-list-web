import { Injectable } from '@nestjs/common';
import { UrlList } from '../entities/url-list.entity';
import { v4 as uuidv4 } from 'uuid';
import { UrlListRepository } from '../repositories/url-list.repository';

@Injectable()
export class CreateUrlListUseCase {
  constructor(private urlListRepository: UrlListRepository) {}

  async execute(data: Partial<UrlList>): Promise<UrlList> {
    // If no slug is provided, generate a random one
    if (!data.slug) {
      data.slug = this.generateSlug();
    } else {
      // Check if slug is unique
      const isUnique = await this.urlListRepository.isSlugUnique(data.slug);
      if (!isUnique) {
        // If slug is not unique, append a random string
        data.slug = `${data.slug}-${this.generateRandomString(6)}`;
      }
    }

    return this.urlListRepository.create(data);
  }

  private generateSlug(): string {
    // Generate a random slug with 8 characters
    return this.generateRandomString(8);
  }

  private generateRandomString(length: number): string {
    // Create a random string that's URL-friendly
    return uuidv4().replace(/-/g, '').substring(0, length);
  }
}

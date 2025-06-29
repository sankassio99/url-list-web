import { Injectable, NotFoundException } from '@nestjs/common';
import { Url } from '../entities/url.entity';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class UpdateUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(id: string, data: Partial<Url>): Promise<Url> {
    // Check if URL exists
    const existingUrl = await this.urlRepository.findById(id);
    if (!existingUrl) {
      throw new NotFoundException(`URL with ID ${id} not found`);
    }

    return this.urlRepository.update(id, data);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class DeleteUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(id: string): Promise<void> {
    // Check if URL exists
    const existingUrl = await this.urlRepository.findById(id);
    if (!existingUrl) {
      throw new NotFoundException(`URL with ID ${id} not found`);
    }

    await this.urlRepository.delete(id);
  }
}

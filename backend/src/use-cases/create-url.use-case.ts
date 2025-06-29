import { Injectable } from '@nestjs/common';
import { Url } from '../entities/url.entity';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class CreateUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(data: Partial<Url>): Promise<Url> {
    return this.urlRepository.create(data);
  }
}

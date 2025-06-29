import { Url } from '../url.entity';

export interface IUrlRepository {
  create(url: Partial<Url>): Promise<Url>;
  findAllByListId(listId: string): Promise<Url[]>;
  findById(id: string): Promise<Url | null>;
  update(id: string, url: Partial<Url>): Promise<Url>;
  delete(id: string): Promise<void>;
}

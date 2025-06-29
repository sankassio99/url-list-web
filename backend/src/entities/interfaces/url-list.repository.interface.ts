import { UrlList } from '../url-list.entity';

export interface IUrlListRepository {
  create(urlList: Partial<UrlList>): Promise<UrlList>;
  findAll(): Promise<UrlList[]>;
  findById(id: string): Promise<UrlList | null>;
  findBySlug(slug: string): Promise<UrlList | null>;
  update(id: string, urlList: Partial<UrlList>): Promise<UrlList>;
  delete(id: string): Promise<void>;
  isSlugUnique(slug: string): Promise<boolean>;
}

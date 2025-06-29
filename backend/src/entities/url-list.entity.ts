import { Url } from './url.entity';

export class UrlList {
  id: string;
  slug: string;
  title?: string;
  createdAt: Date;
  updatedAt: Date;
  urls: Url[];
}

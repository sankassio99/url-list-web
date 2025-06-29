import type { CreateUrlListDto, UrlDto, UrlListApi, UrlListControllerCreateRequest, UrlListControllerFindOneRequest, UrlListControllerRemoveRequest, UrlListDto } from "~/api-client";
import { useApiClient } from '~/composables/useApiClient';
import type { IUrlListRepository } from "./IUrlListRepository";
import type { UrlItem, UrlList } from "./localStorage";


export class ApiClientRepository implements IUrlListRepository {
    urlListApi: UrlListApi;

    constructor() {
        const { urlListApi } = useApiClient();
        this.urlListApi = urlListApi;
    }

    async getAllLists(): Promise<UrlList[]> {
        const lists = await this.urlListApi.urlListControllerFindAll();
        return lists.map(item => this.mapUrlList(item));
    }
    async createList(name?: string, customSlug?: string): Promise<UrlList> {
        const createUrlListDto: CreateUrlListDto = {
            title: name || "New List",
            slug: customSlug || `list-${Date.now()}`
        };

        const created = await this.urlListApi.urlListControllerCreate(<UrlListControllerCreateRequest>{ createUrlListDto }) as unknown as Promise<UrlList>;
   
        return created;
    }
    async getListById(id: string): Promise<UrlList | undefined> {
        const item = await this.urlListApi.urlListControllerFindOne(<UrlListControllerFindOneRequest>{ id });

        return this.mapUrlList(item);
    }

    private mapUrlList(item: UrlListDto) {
        let urlList: UrlList = {} as UrlList;

        urlList.id = item.id;
        urlList.name = item.title;
        urlList.urls = this.mapUrlItem(item.urls) || [];
        urlList.createdAt = item.createdAt.toISOString();
        urlList.customSlug = item.slug;

        return urlList;
    }

    private mapUrlItem(urls: Array<UrlDto>): UrlItem[] {
        return urls.map(url => {
            let urlItem: UrlItem = {} as UrlItem;
            urlItem.id = url.id;
            urlItem.title = url.title;
            urlItem.url = url.url;
            urlItem.createdAt = url.createdAt.toISOString();
            return urlItem;
        });
    }

    getListBySlug(slug: string): Promise<UrlList | undefined> {
        throw new Error("Method not implemented.");
    }
    updateList(updatedList: UrlList): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteList(id: string): Promise<void> {
        return await this.urlListApi.urlListControllerRemove(<UrlListControllerRemoveRequest>{ id }) as unknown as Promise<void>;
    }
    addUrlToList(listId: string, url: string): Promise<UrlItem> {
        throw new Error("Method not implemented.");
    }
    updateUrlInList(listId: string, urlItem: UrlItem): Promise<void> {
        throw new Error("Method not implemented.");
    }
    removeUrlFromList(listId: string, urlId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateListSlug(listId: string, newSlug: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
   
  
}
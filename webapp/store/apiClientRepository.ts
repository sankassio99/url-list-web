import type { CreateUrlListDto, UrlListApi, UrlListControllerCreateRequest, UrlListControllerFindOneRequest, UrlListControllerRemoveRequest } from "~/api-client";
import type { IUrlListRepository } from "./IUrlListRepository";
import type { UrlList, UrlItem } from "./localStorage";
import { useApiClient } from '~/composables/useApiClient';


export class ApiClientRepository implements IUrlListRepository {
    urlListApi: UrlListApi;

    constructor() {
        const { urlListApi } = useApiClient();
        this.urlListApi = urlListApi;
    }

    async getAllLists(): Promise<UrlList[]> {
        const lists = await this.urlListApi.urlListControllerFindAll();
        console.log("Fetched lists:", lists);
        return lists as unknown as Promise<UrlList[]>;
    }
    async createList(name?: string, customSlug?: string): Promise<UrlList> {
        const createUrlListDto: CreateUrlListDto = {
            title: name || "New List",
            slug: customSlug || `list-${Date.now()}`
        };

        const created = await this.urlListApi.urlListControllerCreate(<UrlListControllerCreateRequest>{ createUrlListDto }) as unknown as Promise<UrlList>;
   
        return created;
    }
    getListById(id: string): Promise<UrlList | undefined> {
        return this.urlListApi.urlListControllerFindOne(<UrlListControllerFindOneRequest>{ id }) as unknown as Promise<UrlList | undefined>;
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
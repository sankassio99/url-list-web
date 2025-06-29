import type { UrlItem, UrlList } from "./localStorage";

// LocalStorage Service interface
export interface IUrlListRepository {
    getAllLists(): Promise<UrlList[]>;
    createList(name?: string, customSlug?: string): Promise<UrlList>;
    getListById(id: string): Promise<UrlList | undefined>;
    getListBySlug(slug: string): Promise<UrlList | undefined>;
    updateList(updatedList: UrlList): Promise<void>;
    deleteList(id: string): Promise<void>;
    addUrlToList(listId: string, url: string): Promise<UrlItem>;
    updateUrlInList(listId: string, urlItem: UrlItem): Promise<void>;
    removeUrlFromList(listId: string, urlId: string): Promise<void>;
    updateListSlug(listId: string, newSlug: string): Promise<void>;
}
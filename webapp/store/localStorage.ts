import type { IUrlListRepository } from "./IUrlListRepository";

// Types for our application
export interface UrlItem {
  id: string;
  url: string;
  title?: string;
  description?: string;
  createdAt: string;
}

export interface UrlList {
  id: string;
  name: string;
  urls: UrlItem[];
  createdAt: string;
  customSlug?: string;
}

// LocalStorage Service
export const useLocalStorageService = (): IUrlListRepository => {
  const STORAGE_KEY = 'urlist_data';

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  };

  const generateRandomSlug = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  const getAllLists = async (): Promise<UrlList[]> => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing URL lists from localStorage', error);
      return [];
    }
  };

  const saveLists = (lists: UrlList[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  };

  const createList = async (name: string = 'New List', customSlug?: string): Promise<UrlList> => {
    const lists = await getAllLists();
    const slug = customSlug || generateRandomSlug();
    if (customSlug && lists.some(list => list.customSlug === customSlug)) {
      throw new Error('This custom URL is already taken. Please choose another one.');
    }
    const newList: UrlList = {
      id: generateId(),
      name,
      urls: [],
      createdAt: new Date().toISOString(),
      customSlug: slug
    };
    lists.push(newList);
    saveLists(lists);
    return newList;
  };

  const getListById = async (id: string): Promise<UrlList | undefined> => {
    const lists = await getAllLists();
    return lists.find(list => list.id === id);
  };

  const getListBySlug = async (slug: string): Promise<UrlList | undefined> => {
    const lists = await getAllLists();
    return lists.find(list => list.customSlug === slug);
  };

  const updateList = async (updatedList: UrlList): Promise<void> => {
    const lists = await getAllLists();
    const index = lists.findIndex(list => list.id === updatedList.id);
    if (index !== -1) {
      lists[index] = updatedList;
      saveLists(lists);
    }
  };

  const deleteList = async (id: string): Promise<void> => {
    const lists = await getAllLists();
    const updatedLists = lists.filter(list => list.id !== id);
    saveLists(updatedLists);
  };

  const addUrlToList = async (listId: string, url: string): Promise<UrlItem> => {
    const lists = await getAllLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    const urlItem: UrlItem = {
      id: generateId(),
      url,
      title: url,
      createdAt: new Date().toISOString()
    };
    lists[listIndex].urls.push(urlItem);
    saveLists(lists);
    return urlItem;
  };

  const updateUrlInList = async (listId: string, urlItem: UrlItem): Promise<void> => {
    const lists = await getAllLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    const urlIndex = lists[listIndex].urls.findIndex(u => u.id === urlItem.id);
    if (urlIndex === -1) {
      throw new Error('URL not found in this list');
    }
    lists[listIndex].urls[urlIndex] = urlItem;
    saveLists(lists);
  };

  const removeUrlFromList = async (listId: string, urlId: string): Promise<void> => {
    const lists = await getAllLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    lists[listIndex].urls = lists[listIndex].urls.filter(url => url.id !== urlId);
    saveLists(lists);
  };

  const updateListSlug = async (listId: string, newSlug: string): Promise<void> => {
    const lists = await getAllLists();
    if (lists.some(list => list.customSlug === newSlug && list.id !== listId)) {
      throw new Error('This custom URL is already taken. Please choose another one.');
    }
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    lists[listIndex].customSlug = newSlug;
    saveLists(lists);
  };

  return {
    getAllLists,
    createList,
    getListById,
    getListBySlug,
    updateList,
    deleteList,
    addUrlToList,
    updateUrlInList,
    removeUrlFromList,
    updateListSlug
  };
};

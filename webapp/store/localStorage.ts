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
export const useLocalStorageService = () => {
  // Key for storing lists in localStorage
  const STORAGE_KEY = 'urlist_data';

  // Generate a unique ID
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  };

  // Generate a random slug if user doesn't provide one
  const generateRandomSlug = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Get all URL lists
  const getAllLists = (): UrlList[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing URL lists from localStorage', error);
      return [];
    }
  };

  // Save all URL lists to localStorage
  const saveLists = (lists: UrlList[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  };

  // Create a new URL list
  const createList = (name: string = 'New List', customSlug?: string): UrlList => {
    const lists = getAllLists();
    
    const slug = customSlug || generateRandomSlug();
    
    // Check if slug already exists
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

  // Get a URL list by ID
  const getListById = (id: string): UrlList | undefined => {
    const lists = getAllLists();
    return lists.find(list => list.id === id);
  };

  // Get a URL list by custom slug
  const getListBySlug = (slug: string): UrlList | undefined => {
    const lists = getAllLists();
    return lists.find(list => list.customSlug === slug);
  };

  // Update a URL list
  const updateList = (updatedList: UrlList): void => {
    const lists = getAllLists();
    const index = lists.findIndex(list => list.id === updatedList.id);
    
    if (index !== -1) {
      lists[index] = updatedList;
      saveLists(lists);
    }
  };

  // Delete a URL list
  const deleteList = (id: string): void => {
    const lists = getAllLists();
    const updatedLists = lists.filter(list => list.id !== id);
    saveLists(updatedLists);
  };

  // Add URL to a list
  const addUrlToList = (listId: string, url: string): UrlItem => {
    const lists = getAllLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    
    // Create a new URL item
    const urlItem: UrlItem = {
      id: generateId(),
      url,
      title: url, // Initially set title to the URL itself
      createdAt: new Date().toISOString()
    };
    
    lists[listIndex].urls.push(urlItem);
    saveLists(lists);
    
    return urlItem;
  };

  // Update URL in a list
  const updateUrlInList = (listId: string, urlItem: UrlItem): void => {
    const lists = getAllLists();
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

  // Remove URL from a list
  const removeUrlFromList = (listId: string, urlId: string): void => {
    const lists = getAllLists();
    const listIndex = lists.findIndex(list => list.id === listId);
    
    if (listIndex === -1) {
      throw new Error('List not found');
    }
    
    lists[listIndex].urls = lists[listIndex].urls.filter(url => url.id !== urlId);
    saveLists(lists);
  };

  // Update the custom slug for a list
  const updateListSlug = (listId: string, newSlug: string): void => {
    const lists = getAllLists();
    
    // Check if slug already exists
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
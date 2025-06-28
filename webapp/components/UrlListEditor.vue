<template>
  <div class="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div class="w-full md:w-1/2 mb-4 md:mb-0">
        <input
          v-model="listName"
          @blur="updateListName"
          class="text-2xl font-bold bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
          placeholder="List Name"
        />
      </div>
      <div class="w-full md:w-1/2 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-3">
        <div class="relative flex-grow md:max-w-xs">
          <input
            v-model="customSlug"
            @blur="updateCustomSlug"
            class="border border-gray-300 rounded-md px-3 py-2 w-full"
            placeholder="Custom URL (optional)"
          />
          <p v-if="slugError" class="text-red-500 text-xs mt-1">{{ slugError }}</p>
        </div>
        <button 
          @click="publishList"
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          {{ isPublished ? 'Copy Share Link' : 'Publish List' }}
        </button>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex border border-gray-300 rounded-md overflow-hidden">
        <input
          v-model="newUrl"
          @keydown.enter="addUrl"
          class="flex-grow p-3 focus:outline-none"
          placeholder="Add a URL (press Enter to add)"
        />
        <button
          @click="addUrl"
          class="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          Add URL
        </button>
      </div>
      <p v-if="urlError" class="text-red-500 text-sm mt-1">{{ urlError }}</p>
    </div>

    <div v-if="urlList && urlList.urls.length === 0" class="text-center py-8 bg-gray-100 rounded-md">
      <p class="text-gray-500">This list is empty. Add some URLs to get started!</p>
    </div>

    <div v-else>
      <UrlItem
        v-for="url in urlList?.urls"
        :key="url.id"
        :url="url"
        :list-id="urlList?.id || ''"
        @update="updateUrl"
        @remove="removeUrl"
      />
    </div>

    <div class="mt-6 flex justify-between">
      <button 
        @click="confirmDelete" 
        class="text-red-500 hover:text-red-700 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete List
      </button>
      
      <div v-if="isPublished" class="text-sm text-gray-500">
        Last updated: {{ formatDate(urlList?.createdAt || '') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorageService, type UrlItem, type UrlList } from '~/store/localStorage';

const props = defineProps<{
  listId: string;
}>();

const storageService = useLocalStorageService();
const router = useRouter();

const urlList = ref<UrlList | null>(null);
const newUrl = ref('');
const listName = ref('');
const customSlug = ref('');
const urlError = ref('');
const slugError = ref('');
const isPublished = ref(false);

onMounted(() => {
  loadList();
});

watch(() => props.listId, () => {
  loadList();
});

const loadList = () => {
  if (!props.listId) {
    router.push('/');
    return;
  }
  
  const list = storageService.getListById(props.listId);
  
  if (!list) {
    router.push('/lists');
    return;
  }
  
  urlList.value = list;
  listName.value = list.name;
  customSlug.value = list.customSlug || '';
  isPublished.value = !!list.customSlug;
};

const updateListName = () => {
  if (!urlList.value) return;
  
  if (listName.value.trim()) {
    urlList.value.name = listName.value.trim();
    storageService.updateList(urlList.value);
  } else {
    listName.value = urlList.value.name;
  }
};

const updateCustomSlug = () => {
  if (!urlList.value) return;
  
  const slug = customSlug.value.trim();
  
  if (!slug) {
    slugError.value = '';
    return;
  }
  
  try {
    storageService.updateListSlug(urlList.value.id, slug);
    urlList.value.customSlug = slug;
    slugError.value = '';
    isPublished.value = true;
  } catch (error) {
    if (error instanceof Error) {
      slugError.value = error.message;
    }
  }
};

const addUrl = () => {
  if (!urlList.value) return;
  
  const url = newUrl.value.trim();
  
  if (!url) {
    urlError.value = 'Please enter a URL';
    return;
  }
  
  try {
    storageService.addUrlToList(urlList.value.id, url);
    urlError.value = '';
    newUrl.value = '';
    loadList(); // Refresh the list
  } catch (error) {
    if (error instanceof Error) {
      urlError.value = error.message;
    }
  }
};

const updateUrl = (updatedUrl: UrlItem) => {
  if (!urlList.value) return;
  
  try {
    storageService.updateUrlInList(urlList.value.id, updatedUrl);
    loadList(); // Refresh the list
  } catch (error) {
    console.error('Error updating URL:', error);
    alert('Failed to update URL. Please try again.');
  }
};

const removeUrl = (urlId: string) => {
  if (!urlList.value) return;
  
  try {
    storageService.removeUrlFromList(urlList.value.id, urlId);
    loadList(); // Refresh the list
  } catch (error) {
    console.error('Error removing URL:', error);
    alert('Failed to remove URL. Please try again.');
  }
};

const publishList = () => {
  if (!urlList.value) return;
  
  if (isPublished.value) {
    // Copy to clipboard
    const shareUrl = window.location.origin + '/share/' + urlList.value.customSlug;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Share link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy link. The share URL is: ' + shareUrl);
      });
  } else {
    if (!customSlug.value.trim()) {
      // Generate random slug
      try {
        const newList = storageService.createList(urlList.value.name);
        storageService.deleteList(urlList.value.id);
        
        // Copy URLs to new list
        urlList.value.urls.forEach(url => {
          storageService.addUrlToList(newList.id, url.url);
        });
        
        router.push(`/list/${newList.id}`);
      } catch (error) {
        console.error('Error publishing list:', error);
        alert('Failed to publish list. Please try again.');
      }
    } else {
      updateCustomSlug();
    }
  }
};

const confirmDelete = () => {
  if (!urlList.value) return;
  
  if (confirm('Are you sure you want to delete this list? This action cannot be undone.')) {
    storageService.deleteList(urlList.value.id);
    router.push('/lists');
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
</script>
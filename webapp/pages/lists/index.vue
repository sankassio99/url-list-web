<template>
  <div class="container mx-auto p-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-blue-700">My URL Lists</h1>
          <button @click="createNewList"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Create New List
          </button>
        </div>

        <div v-if="lists.length === 0" class="text-center py-12 bg-gray-50 rounded-md">
          <p class="text-gray-500 mb-4">You haven't created any lists yet.</p>
          <button @click="createNewList"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Create Your First List
          </button>
        </div>

        <div v-else>
          <div v-for="list in lists" :key="list.id" class="mb-4 border border-gray-200 rounded-md p-4 hover:bg-gray-50">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-xl font-semibold text-blue-700">{{ list.name }}</h2>
                <p class="text-gray-500 text-sm">
                  {{ list.urls.length }} URLs | Created: {{ formatDate(list.createdAt) }}
                </p>
                <p v-if="list.customSlug" class="text-sm mt-1">
                  Share link:
                  <span @click="copyShareLink(list.customSlug!)" class="text-blue-600 cursor-pointer hover:underline">
                    {{ getShareUrl(list.customSlug!) }}
                  </span>
                </p>
              </div>
              <div class="flex space-x-2">
                <NuxtLink :to="`/list/${list.id}`"
                  class="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
                  Edit
                </NuxtLink>
                <button @click="confirmDelete(list.id)"
                  class="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { IUrlListRepository } from '~/store/IUrlListRepository';
import type { UrlList } from '~/store/localStorage';

const router = useRouter();
const storageService = inject('urlListRepository') as unknown as IUrlListRepository;

const lists = ref<UrlList[]>([]);

onMounted(async () => {
  await loadLists();
});

const loadLists = async () => {
  const allLists = await storageService.getAllLists();
  console.log('Loaded lists:', allLists);
  lists.value = allLists;
};

const createNewList = async () => {
  try {
    const newList = await storageService.createList();
    router.push(`/list/${newList.id}`);
  } catch (error) {
    console.error('Error creating new list:', error);
    alert('Failed to create new list. Please try again.');
  }
};

const confirmDelete = async (listId: string) => {
  if (confirm('Are you sure you want to delete this list? This action cannot be undone.')) {
    await storageService.deleteList(listId);
    loadLists();
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

const getShareUrl = (slug: string) => {
  return `${window.location.origin}/share/${slug}`;
};

const copyShareLink = (slug: string) => {
  const shareUrl = getShareUrl(slug);
  navigator.clipboard.writeText(shareUrl)
    .then(() => {
      alert('Share link copied to clipboard!');
    })
    .catch(() => {
      alert('Failed to copy link. The share URL is: ' + shareUrl);
    });
};
</script>
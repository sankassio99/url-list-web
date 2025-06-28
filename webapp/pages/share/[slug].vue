<template>
  <div class="container mx-auto p-4">
    <div class="max-w-4xl mx-auto">
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="bg-red-50 text-red-700 p-6 rounded-lg shadow text-center">
        <h2 class="text-2xl font-bold mb-2">URL List Not Found</h2>
        <p>The link you're looking for doesn't exist or may have been removed.</p>
        <NuxtLink to="/" class="mt-4 inline-block text-blue-600 hover:underline">
          Go to Homepage
        </NuxtLink>
      </div>

      <div v-else-if="urlList" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="bg-blue-600 p-6 text-white">
          <h1 class="text-2xl md:text-3xl font-bold mb-2">{{ urlList.name }}</h1>
          <p class="text-blue-100">
            Shared list with {{ urlList.urls.length }} URLs
          </p>
        </div>

        <div class="p-6">
          <div v-if="urlList.urls.length === 0" class="text-center py-8 bg-gray-50 rounded-md">
            <p class="text-gray-500">This list is empty.</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="url in urlList.urls" :key="url.id" class="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
              <h3 class="font-medium text-lg text-blue-700 break-all">
                {{ url.title || url.url }}
              </h3>
              <p v-if="url.description" class="text-gray-600 text-sm mt-1">
                {{ url.description }}
              </p>
              <a
                :href="formatUrl(url.url)"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500 hover:underline text-sm break-all mt-2 inline-block"
              >
                {{ url.url }}
              </a>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
          <p class="text-sm text-gray-500">
            Shared via The Urlist
          </p>
          <NuxtLink to="/" class="text-blue-600 text-sm hover:underline">
            Create Your Own List
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLocalStorageService, type UrlList } from '~/store/localStorage';

const route = useRoute();
const storageService = useLocalStorageService();

const urlList = ref<UrlList | null>(null);
const loading = ref(true);
const error = ref(false);

onMounted(() => {
  loadSharedList();
});

const loadSharedList = () => {
  const slug = route.params.slug as string;
  
  if (!slug) {
    error.value = true;
    loading.value = false;
    return;
  }
  
  const list = storageService.getListBySlug(slug);
  
  if (!list) {
    error.value = true;
    loading.value = false;
    return;
  }
  
  urlList.value = list;
  loading.value = false;
};

const formatUrl = (url: string) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'https://' + url;
  }
  return url;
};
</script>
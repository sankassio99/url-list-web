<template>
  <div class="p-4 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">URL Lists</h2>
    <div v-if="loading" class="text-gray-500">Loading URL lists...</div>
    <div v-else-if="error" class="text-red-500">
      Error loading URL lists: {{ error }}
    </div>
    <div v-else-if="urlLists.length === 0" class="text-gray-500">
      No URL lists found
    </div>
    <ul v-else class="space-y-2">
      <li v-for="list in urlLists" :key="list.id" class="border-b pb-2">
        <h3 class="font-semibold">{{ list.name }}</h3>
        <p v-if="list.description" class="text-gray-600 text-sm">
          {{ list.description }}
        </p>
        <div class="text-xs text-gray-500">
          Slug: {{ list.slug }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApiClient } from '~/composables/useApiClient';

const { urlListApi } = useApiClient();
const urlLists = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const lists = await urlListApi.urlListControllerFindAll();
    // The type depends on your API response
    urlLists.value = Array.isArray(lists) ? lists : [];
  } catch (err: any) {
    console.error('Failed to fetch URL lists:', err);
    error.value = err.message || 'Failed to load URL lists';
  } finally {
    loading.value = false;
  }
});
</script>

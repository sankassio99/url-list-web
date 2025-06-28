<template>
  <div class="border border-gray-200 rounded-md p-4 mb-3 bg-white shadow-sm hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start">
      <div>
        <h3 v-if="!isEditing" class="font-medium text-lg text-blue-700 break-all">
          {{ url.title || url.url }}
        </h3>
        <input
          v-else
          v-model="editedUrl"
          class="w-full border border-gray-300 rounded px-2 py-1 mb-2"
          placeholder="Enter URL"
        />
        <p v-if="url.description && !isEditing" class="text-gray-600 text-sm mt-1">{{ url.description }}</p>
        <textarea
          v-if="isEditing"
          v-model="editedDescription"
          class="w-full border border-gray-300 rounded px-2 py-1 mb-2"
          placeholder="Description (optional)"
          rows="2"
        ></textarea>
        <a
          v-if="!isEditing"
          :href="formattedUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline text-sm break-all"
        >
          {{ url.url }}
        </a>
      </div>
      <div class="flex space-x-2 ml-2">
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="text-gray-500 hover:text-blue-600"
          title="Edit URL"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          v-if="isEditing"
          @click="saveChanges"
          class="text-green-600 hover:text-green-800"
          title="Save changes"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <button
          v-if="isEditing"
          @click="cancelEditing"
          class="text-gray-500 hover:text-gray-700"
          title="Cancel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          @click="removeUrl"
          class="text-red-500 hover:text-red-700"
          title="Remove URL"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { UrlItem } from '~/store/localStorage';

const props = defineProps<{
  url: UrlItem;
  listId: string;
}>();

const emit = defineEmits<{
  update: [url: UrlItem];
  remove: [id: string];
}>();

const isEditing = ref(false);
const editedUrl = ref(props.url.url);
const editedDescription = ref(props.url.description || '');

const formattedUrl = computed(() => {
  let url = props.url.url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
});

const startEditing = () => {
  isEditing.value = true;
  editedUrl.value = props.url.url;
  editedDescription.value = props.url.description || '';
};

const saveChanges = () => {
  if (!editedUrl.value.trim()) {
    alert('URL cannot be empty');
    return;
  }
  
  const updatedUrl: UrlItem = {
    ...props.url,
    url: editedUrl.value.trim(),
    description: editedDescription.value.trim() || undefined
  };
  
  emit('update', updatedUrl);
  isEditing.value = false;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const removeUrl = () => {
  if (confirm('Are you sure you want to remove this URL?')) {
    emit('remove', props.url.id);
  }
};
</script>
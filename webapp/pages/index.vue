<template>
  <div class="container mx-auto p-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-blue-700">Welcome to The Urlist</h1>
        <p class="text-xl text-gray-600 mb-8">Create and share collections of URLs easily with just one link.</p>
        
        <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            @click="createNewList"
            class="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg"
          >
            Create New List
          </button>
          <NuxtLink
            to="/lists"
            class="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors text-lg"
          >
            View My Lists
          </NuxtLink>
        </div>
      </div>
      
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-blue-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold mb-2">Create</h2>
          <p class="text-gray-600">Create lists of URLs with custom titles and descriptions.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-blue-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold mb-2">Share</h2>
          <p class="text-gray-600">Share your URL collections with a single link. Choose a custom URL or let us generate one.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="text-blue-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold mb-2">Organize</h2>
          <p class="text-gray-600">Keep your important links organized in one place for easy access anytime.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLocalStorageService } from '~/store/localStorage';

const router = useRouter();
const storageService = useLocalStorageService();

const createNewList = () => {
  try {
    const newList = storageService.createList();
    router.push(`/list/${newList.id}`);
  } catch (error) {
    console.error('Error creating new list:', error);
    alert('Failed to create new list. Please try again.');
  }
};
</script>
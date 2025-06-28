<template>
  <nav class="bg-blue-600 p-4 text-white">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <NuxtLink to="/" class="text-xl font-bold">The Urlist</NuxtLink>
      </div>
      <div class="hidden md:block">
        <NuxtLink to="/" class="mr-4 hover:text-blue-200">Home</NuxtLink>
        <NuxtLink to="/lists" class="mr-4 hover:text-blue-200">My Lists</NuxtLink>
        <button 
          @click="createNewList"
          class="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-blue-100 transition-colors"
        >
          Create New List
        </button>
      </div>
      <div class="block md:hidden">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div v-if="showMenu" class="absolute right-0 top-16 bg-blue-600 p-4 w-full">
          <NuxtLink to="/" class="block py-2 hover:text-blue-200">Home</NuxtLink>
          <NuxtLink to="/lists" class="block py-2 hover:text-blue-200">My Lists</NuxtLink>
          <button 
            @click="createNewList"
            class="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-blue-100 transition-colors mt-2 w-full"
          >
            Create New List
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorageService } from '~/store/localStorage';

const router = useRouter();
const storageService = useLocalStorageService();
const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const createNewList = () => {
  try {
    const newList = storageService.createList();
    router.push(`/list/${newList.id}`);
    showMenu.value = false;
  } catch (error) {
    console.error('Error creating new list:', error);
  }
};
</script>
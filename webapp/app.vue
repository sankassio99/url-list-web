<template>
  <div class="min-h-screen bg-gray-100">
    <TheNavbar />
    <main class="py-6">
      <NuxtPage />
    </main>
    <footer class="bg-white border-t border-gray-200 py-4">
      <ApiClientExample />

      <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
        &copy; {{ new Date().getFullYear() }} The Urlist - Share your favorite links easily.
      </div>
    </footer>
  </div>
</template>

<script setup>
import ApiClientExample from './components/examples/ApiClientExample.vue';

// script content
</script>

<style scoped>
/* Add any component-specific styles here */
</style>

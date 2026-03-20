<script setup lang="ts">
defineProps<{
  searchQuery: string
  selectedCategory: string
  categories: string[]
}>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCategory': [value: string]
}>()

function formatCategory(cat: string): string {
  return cat.split('-').map(w =>  w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
</script>

<template>
  <div class="bg-white border-b border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3">

      
      <div class="relative flex-1">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search dresses, shoes, bags..."
          :value="searchQuery"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
        />
      </div>

      
      <select
        :value="selectedCategory"
        @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
        class="px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 bg-white"
      >
        <option value="">All Categories</option>
        <option
          v-for="cat in categories"
          :key="cat"
          :value="cat"
        >
          {{ formatCategory(cat) }}
        </option>
      </select>

    </div>
  </div>
</template>
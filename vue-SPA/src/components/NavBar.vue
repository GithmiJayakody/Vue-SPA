<script setup lang="ts">
defineProps<{
  cartCount: number
}>()
</script>

<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      
      <div class="flex items-center gap-2">
        <span class="text-2xl">👗</span>
        <span class="text-xl font-black text-pink-500 tracking-tight">StyleCart</span>
      </div>

      
      <button class="relative flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-5 py-2 rounded-xl transition-colors">
        <span>🛒</span>
        <span>Cart</span>
        <span
          v-if="cartCount > 0"
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center"
        >
          {{ cartCount }}
        </span>
      </button>

    </div>
  </header>
</template>
<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white p-6">
    
    <div class="relative h-64 bg-gray-50 overflow-hidden">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    
    <div class="p-4">
      <p class="text-xs text-pink-500 font-semibold uppercase tracking-widest mb-1">
        {{ product.category }}
      </p>
      <h2 class="text-sm font-bold text-gray-800 line-clamp-1 mb-2">
        {{ product.title }}
      </h2>
      <div class="flex items-center justify-between mt-3">
        <span class="text-lg font-black text-gray-900">
          ${{ product.price }}
        </span>
        <button class="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
          Add to Cart
        </button>
      </div>
    </div>

  </div>
</template>
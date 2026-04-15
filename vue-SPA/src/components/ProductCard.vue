<script setup lang="ts">
import type { Product } from '../types/product'
import { useCartStore } from '../stores/cart'

defineProps<{
  product: Product
}>()

const cart = useCartStore()
</script>

<template>
  <div class="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-100 cursor-pointer group">
    
    <div class="relative h-96 bg-gray-50 dark:bg-gray-800 overflow-hidden">
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
      <h2 class="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-1 mb-2">
        {{ product.title }}
      </h2>
      <div class="flex items-center justify-between mt-3">
        <span class="text-lg font-black text-gray-900 dark:text-white">
          ${{ product.price }}
        </span>
        <button 
          @click.stop="cart.addToCart(product)"
          class="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>

  </div>
</template>
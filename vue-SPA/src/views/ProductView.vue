<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '../types/product'

const route = useRoute()   
const router = useRouter() 

const product = ref<Product | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)
const selectedImage = ref('')

async function fetchProduct() {
  try {
    isLoading.value = true
    
    const id = route.params.id
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data: Product = await response.json()
    product.value = data
    selectedImage.value = data.thumbnail
  } catch (e) {
    error.value = 'Product not found.'
  } finally {
    isLoading.value = false
  }
}

function formatCategory(cat: string): string {
  return cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">

    
    <div class="max-w-7xl mx-auto px-4 pt-8">
      <button
        @click="router.push('/')"
        class="flex items-center gap-2 text-sm text-gray-500 hover:text-pink-500 transition-colors font-medium"
      >
        ← Back to Collection
      </button>
    </div>

    
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-40 gap-4">
      <div class="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-gray-400 text-sm">Loading product...</p>
    </div>

    
    <div v-else-if="error" class="text-center py-40 text-red-400">
      {{ error }}
    </div>

    
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-3xl shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-0">

          
          <div class="p-8 bg-gray-50">
            
            <div class="aspect-square rounded-2xl overflow-hidden mb-4 bg-white">
              <img
                :src="selectedImage"
                :alt="product.title"
                class="w-full h-full object-cover"
              />
            </div>

            
            <div class="flex gap-3 overflow-x-auto pb-2">
              <img
                v-for="img in product.images"
                :key="img"
                :src="img"
                @click="selectedImage = img"
                class="w-16 h-16 rounded-xl object-cover cursor-pointer border-2 transition-all"
                :class="selectedImage === img ? 'border-pink-500' : 'border-transparent'"
              />
            </div>
          </div>

          
          <div class="p-8 flex flex-col justify-between">
            <div>
              
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold text-pink-500 uppercase tracking-widest">
                  {{ formatCategory(product.category) }}
                </span>
                <span class="text-sm text-yellow-500 font-semibold">
                  ★ {{ product.rating }}
                </span>
              </div>

              
              <h1 class="text-2xl font-black text-gray-900 mb-4">
                {{ product.title }}
              </h1>

              
              <p class="text-gray-500 text-sm leading-relaxed mb-6">
                {{ product.description }}
              </p>

              
              <p class="text-xs text-gray-400 mb-6">
                <span
                  :class="product.stock > 10 ? 'text-green-500' : 'text-orange-400'"
                  class="font-semibold"
                >
                  {{ product.stock > 10 ? '✓ In Stock' : `⚠ Only ${product.stock} left` }}
                </span>
              </p>
            </div>

            
            <div>
              <div class="flex items-baseline gap-3 mb-6">
                <span class="text-4xl font-black text-gray-900">
                  ${{ product.price }}
                </span>
                <span class="text-sm text-red-400 font-semibold">
                  -{{ Math.round(product.discountPercentage) }}% OFF
                </span>
              </div>

              <button class="w-full bg-pink-500 hover:bg-pink-600 text-white font-black text-lg py-4 rounded-2xl transition-colors">
                🛒 Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
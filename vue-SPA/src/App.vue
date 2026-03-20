<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product, ProductsResponse } from './types/product'
import ProductCard from './components/ProductCard.vue'
import NavBar from './components/NavBar.vue'
import FilterBar from './components/FilterBar.vue'

const products = ref<Product[]>([])
const isLoading = ref(true)
const cartCount = ref(0)
const searchQuery = ref('')
const selectedCategory = ref('')

const CATEGORIES = [
  'womens-dresses',
  'womens-shoes',
  'womens-bags',
  'womens-jewellery',
  'tops',
  'sunglasses'
]

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === ''
      ? true
      : product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

async function fetchProducts() {
  isLoading.value = true   
  const requests = CATEGORIES.map(cat =>
    fetch(`https://dummyjson.com/products/category/${cat}`)
      .then(res => res.json() as Promise<ProductsResponse>)
  )
  const results = await Promise.all(requests)
  products.value = results.flatMap(r => r.products)
  isLoading.value = false  
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <NavBar :cartCount="cartCount" />

    <FilterBar
      :searchQuery="searchQuery"
      :selectedCategory="selectedCategory"
      :categories="CATEGORIES"
      @update:searchQuery="searchQuery = $event"
      @update:selectedCategory="selectedCategory = $event"
    />

    <main class="max-w-7xl mx-auto px-4 py-10">

      <div class="mb-8">
        <h1 class="text-3xl font-black text-gray-900">Women's Collection</h1>
        <h1 class="text-gray-500 mt-1 text-lg">Discover the latest trends ✨</h1>
      </div>

      <div v-if="isLoading" class="flex flex-col items-center justify-center py-40 gap-4">
        <div class="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p class="text-gray-400 text-sm">Loading StyleCart...</p>
        </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-40">
        <p class="text-4xl mb-4">🔍</p>
        <p class="text-gray-400 text-lg">No products found</p>
        <p class="text-gray-300 text-sm mt-2">Try a different search term</p>
      </div>

      
      <div v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

    </main>
  </div>
</template>
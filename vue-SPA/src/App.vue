<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product, ProductsResponse } from './types/product'
import ProductCard from './components/ProductCard.vue'
import NavBar from './components/NavBar.vue'

const products = ref<Product[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const cartCount = ref(0)

const CATEGORIES = [
  'womens-dresses',
  'womens-shoes',
  'womens-bags',
  'womens-jewellery',
  'tops',
  'sunglasses'
]

async function fetchProducts() {
  try {
    isLoading.value = true
    const requests = CATEGORIES.map(cat =>
      fetch(`https://dummyjson.com/products/category/${cat}`)
        .then(res => res.json() as Promise<ProductsResponse>)
    )
    const results = await Promise.all(requests)
    products.value = results.flatMap(r => r.products)
  } catch (e) {
    error.value = 'Something went wrong. Please refresh.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <NavBar :cartCount="cartCount" />

    <main class="max-w-7xl mx-auto px-4 py-10">

      <div class="mb-8">
        <h1 class="text-3xl font-black text-gray-900">Women's Collection</h1>
        <h1 class="text-gray-500 mt-1 text-lg">Discover the latest trends ✨</h1>
      </div>

      

      
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>

    </main>
  </div>
</template>
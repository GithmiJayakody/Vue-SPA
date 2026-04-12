<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import CartSidebar from './components/CartSidebar.vue'

const route = useRoute()
const isCartOpen = ref(false)

const showNavBar = computed(() => route.path !== '/login')

</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <NavBar 
      v-if="showNavBar"
      @openCart="isCartOpen = true" 
    />
    <CartSidebar
      :isOpen="isCartOpen"
      @close="isCartOpen = false"
    />
    <RouterView />

  </div>
</template>
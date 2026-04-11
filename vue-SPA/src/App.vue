<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import CartSidebar from './components/CartSidebar.vue'

const isCartOpen = ref(false)

</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <NavBar @openCart="isCartOpen = true" />
    <CartSidebar
      :isOpen="isCartOpen"
      @close="isCartOpen = false"
    />
    <RouterView />

  </div>
</template>
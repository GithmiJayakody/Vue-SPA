<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'

const cartCount = ref(0)

</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <NavBar :cartCount="cartCount" />
    <RouterView />

  </div>
</template>
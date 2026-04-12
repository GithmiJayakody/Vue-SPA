<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

defineEmits<{
  openCart: []
}>()

const cart = useCartStore()
const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}

</script>

<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      
      <div class="flex items-center gap-2">
        <span class="text-2xl">👗</span>
        <span class="text-xl font-black text-pink-500 tracking-tight">StyleCart</span>
      </div>

      <div class="flex items-center gap-3">

        <div v-if="auth.isLoggedIn" class="hidden sm:flex items-center gap-2">
          <span class="text-sm font-semibold text-gray-600">
            Hi, {{ auth.user!.firstName }}!
          </span>
        </div>

        <button 
          @click="$emit('openCart')" 
          class="relative flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-5 py-2 rounded-xl transition-colors"
        >
          <span>🛒</span>
          <span>Cart</span>
          <span
            v-if="cart.itemCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ cart.itemCount }}
          </span>
        </button>

        <button
          v-if="auth.isLoggedIn"
          @click="handleLogout"
          class="text-sm text-gray-400 hover:text-red-400 font-medium transition-colors"
        >
          Logout
        </button>

      </div>
      
    </div>
  </header>
</template>
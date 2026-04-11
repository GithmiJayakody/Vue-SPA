<script setup lang="ts">
import { useCartStore } from '../stores/cart'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  close: []
}>()

const cart = useCartStore()
</script>

<template>

<div
    v-if="isOpen"
    class="fixed inset-0 bg-black/40 z-40"
    @click="$emit('close')"
  />


  <div
    class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >

  <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
      <h2 class="text-lg font-black text-gray-900">
        🛒 Your Cart
        <span class="text-pink-500">({{ cart.itemCount }})</span>
      </h2>
      <button
        @click="$emit('close')"
        class="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
      >
        ×
      </button>
    </div>


    <div
      v-if="cart.items.length === 0"
      class="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6"
    >
      <span class="text-6xl">🛍️</span>
      <p class="text-gray-400 font-medium">Your cart is empty</p>
      <p class="text-gray-300 text-sm">Add some items to get started!</p>
    </div>


    <div v-else class="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
      <div
        v-for="item in cart.items"
        :key="item.product.id"
        class="flex gap-4 items-center bg-gray-50 rounded-2xl p-3"
      >

      <img
          :src="item.product.thumbnail"
          :alt="item.product.title"
          class="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        />


        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-gray-800 line-clamp-1">
            {{ item.product.title }}
          </p>
          <p class="text-pink-500 font-black text-sm mt-1">
            ${{ (item.product.price * item.quantity).toFixed(2) }}
          </p>
        </div>


        <div class="flex items-center gap-2">
          <button
            @click="cart.removeFromCart(item.product.id)"
            class="w-7 h-7 rounded-full bg-gray-200 hover:bg-pink-100 text-gray-600 font-bold text-sm transition-colors"
          >
            −
          </button>
          <span class="text-sm font-bold w-4 text-center">{{ item.quantity }}</span>
          <button
            @click="cart.addToCart(item.product)"
            class="w-7 h-7 rounded-full bg-gray-200 hover:bg-pink-100 text-gray-600 font-bold text-sm transition-colors"
          >
            +
          </button>
        </div>

        <button
          @click="cart.deleteFromCart(item.product.id)"
          class="text-gray-300 hover:text-red-400 transition-colors text-lg"
        >
          🗑
        </button>
      </div>
    </div>

    <div v-if="cart.items.length > 0" class="px-6 py-5 border-t border-gray-100 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-gray-500 font-medium">Total</span>
        <span class="text-2xl font-black text-gray-900">
          ${{ cart.totalPrice.toFixed(2) }}
        </span>
      </div>
      <button class="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-4 rounded-2xl transition-colors text-lg">
        Checkout →
      </button>
      <button
        @click="cart.clearCart()"
        class="w-full text-gray-400 hover:text-red-400 text-sm font-medium transition-colors"
      >
        Clear Cart
      </button>
    </div>

  </div>
</template>
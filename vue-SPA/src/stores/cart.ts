import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types/product'


export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {

  const items = ref<CartItem[]>([])


  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )


  function addToCart(product: Product) {
    const existing = items.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: number) {
  const index = items.value.findIndex(item => item.product.id === productId)
  if (index === -1) return

  const item = items.value[index] as CartItem
  if (item.quantity > 1) {
    item.quantity--
  } else {
    items.value.splice(index, 1)
  }
}

  function deleteFromCart(productId: number) {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    itemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart
  }
})
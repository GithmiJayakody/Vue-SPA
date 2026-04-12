import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  accessToken: string
}

export const useAuthStore = defineStore('auth', () => {

  
  const user = ref<AuthUser | null>(
    localStorage.getItem('stylecart_user')
      ? JSON.parse(localStorage.getItem('stylecart_user')!)
      : null
  )
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  
  const isLoggedIn = computed(() => user.value !== null)

  
  async function login(username: string, password: string) {
    try {
      isLoading.value = true
      error.value = null

      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        throw new Error('Invalid username or password')
      }

      const data: AuthUser = await response.json()

      
      user.value = data

      
      localStorage.setItem('stylecart_user', JSON.stringify(data))

    } catch (e: any) {
      error.value = e.message || 'Login failed. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('stylecart_user')
  }

  return {
    user,
    isLoading,
    error,
    isLoggedIn,
    login,
    logout
  }
})
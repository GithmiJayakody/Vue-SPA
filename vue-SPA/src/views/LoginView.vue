<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useDarkMode } from '../composables/useDarkMode'

const router = useRouter()
const auth = useAuthStore()
const { isDark, toggleDark } = useDarkMode()

const username = ref('')
const password = ref('')

async function handleLogin() {
  if (!username.value || !password.value) return
  await auth.login(username.value, password.value)
  if (auth.isLoggedIn) {
    router.push('/')
  }
}
</script>

<template>

  <header class="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-md dark:shadow-gray-800 transition-colors duration-300">
    <div class="w-full mx-auto px-6 py-4 flex items-center justify-between">

      <div class="flex items-center gap-2">
        <span class="text-2xl">👗</span>
        <span class="text-xl font-black text-pink-500 tracking-tight">StyleCart</span>
      </div>

      <div class="flex items-center gap-3">

        <button
          @click="toggleDark"
          class="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

      </div>
    </div>
  </header>


  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
    <div class="w-full max-w-md">

      
      <div class="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm dark:shadow-gray-800 p-8">

        
        <div class="text-center mb-10">
          <span class="text-4xl">👗</span>
          <h1 class="text-2xl font-black text-pink-500 mt-2">StyleCart</h1>
          <p class="text-gray-400 text-base mt-1">Sign in to your account</p>
        </div>

        
        <div
          v-if="auth.error"
          class="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 mb-6"
        >
          {{ auth.error }}
        </div>

        
        <div class="flex flex-col gap-6">

          
          <div>
            <label class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">
              Username
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              class="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 mt-2"
            />
          </div>

          
          <div>
            <label class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              @keyup.enter="handleLogin"
              class="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 mt-2"
            />
          </div>

          
          <button
            @click="handleLogin"
            :disabled="auth.isLoading"
            class="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-black py-4 rounded-2xl transition-colors mt-4"
          >
            <span v-if="auth.isLoading">Signing in...</span>
            <span v-else>Sign In →</span>
          </button>

        </div>


      </div>
    </div>
  </div>
</template>
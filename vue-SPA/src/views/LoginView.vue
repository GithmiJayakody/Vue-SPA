<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

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
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">

      
      <div class="bg-white rounded-3xl shadow-sm p-8">

        
        <div class="text-center mb-8">
          <span class="text-4xl">👗</span>
          <h1 class="text-2xl font-black text-pink-500 mt-2">StyleCart</h1>
          <p class="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        
        <div
          v-if="auth.error"
          class="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 mb-6"
        >
          {{ auth.error }}
        </div>

        
        <div class="flex flex-col gap-4">

          
          <div>
            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
              Username
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
            />
          </div>

          
          <div>
            <label class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              @keyup.enter="handleLogin"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
            />
          </div>

          
          <button
            @click="handleLogin"
            :disabled="auth.isLoading"
            class="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-black py-4 rounded-2xl transition-colors mt-2"
          >
            <span v-if="auth.isLoading">Signing in...</span>
            <span v-else>Sign In →</span>
          </button>

        </div>

        
        <div class="mt-6 bg-gray-50 rounded-2xl p-4">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Test Account
          </p>
          <p class="text-xs text-gray-500">
            Username: <span class="font-bold text-gray-700">emilys</span>
          </p>
          <p class="text-xs text-gray-500 mt-1">
            Password: <span class="font-bold text-gray-700">emilyspass</span>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/product/:id',
      component: ProductView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: LoginView
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return '/login'
  }

  if (to.path === '/login' && auth.isLoggedIn) {
    return '/'
  }
})

export default router
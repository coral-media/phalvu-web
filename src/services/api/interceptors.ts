// src/services/api/interceptors.ts
import { axiosInstance } from './index'
import { useAppStore } from '@/stores/app'
import router from '@/router' // Ensure you export your router instance from router/index.ts

let isRedirecting = false

axiosInstance.interceptors.request.use((config) => {
  const store = useAppStore()
  const token = import.meta.env.VITE_API_KEY || store.auth.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    delete config.headers.Authorization
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const store = useAppStore()
    const status = error?.response?.status

    if (status === 401 && !isRedirecting) {
      isRedirecting = true

      store.clearAuth() // Clear the stored token
      await router.push({ name: '/account/login' }) // Adjust route name if needed

      setTimeout(() => {
        isRedirecting = false
      }, 1000)
    }

    return Promise.reject(error)
  }
)

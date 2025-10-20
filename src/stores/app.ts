// src/stores/app.ts
import { defineStore } from 'pinia'
import i18n from '@/plugins/i18n'

export const useAppStore = defineStore('app', {
  state: () => ({
    locale: (import.meta.env.VITE_DEFAULT_LOCALE || 'es') as 'en' | 'es',
    theme: (import.meta.env.VITE_DEFAULT_THEME || 'dark') as 'dark' | 'light',
    auth: {
      token: import.meta.env.VITE_DEFAULT_API_KEY || null,
      expires: null as number | null, // You can change to Date if needed
    },
    navigation: {
      first: null as string | null,
      last: null as string | null,
    },
  }),
  actions: {
    switchLocale(newLocale: string) {
      // Ensure the newLocale is one of the supported ones
      if (['en', 'es'].includes(newLocale)) {
        this.locale = newLocale as 'en' | 'es'
        i18n.global.locale.value = newLocale as 'en' | 'es'
      }
    },
    switchTheme(newTheme: string) {
      this.theme = newTheme as 'dark' | 'light'
    },
    setAuth({ token, expires }: { token: string; expires: number | null }) {
      this.auth.token = token
      this.auth.expires = expires
    },
    clearAuth() {
      this.auth.token = null
      this.auth.expires = null
    },
    isAuthenticated() {
      return this.auth?.token && this.auth?.expires
    },
    setFirstPage(path: string) {
      if (!this.navigation.first) {
        this.navigation.first = path
      }
    },
    setLastPage(path: string) {
      this.navigation.last = path
    },
  },
  persist: true,
})

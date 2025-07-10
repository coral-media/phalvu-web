// src/stores/app.ts
import { defineStore } from 'pinia'
import i18n from '@/plugins/i18n'

export const useAppStore = defineStore('app', {
  state: () => ({
    locale: (import.meta.env.VITE_DEFAULT_LOCALE || 'es') as 'en' | 'es',
    theme: (import.meta.env.VITE_DEFAULT_THEME || 'light') as 'dark' | 'light',
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
  },
  persist: true,
})

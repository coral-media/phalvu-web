// Utilities
import { defineStore } from 'pinia'
import i18n from '@/plugins/i18n'

export const useAppStore = defineStore('app', {
  state: () => ({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
  }),
  getters: {
  },
  actions: {
    switchLocale(locale: string) {
      i18n.global.locale.value = locale
      this.locale = locale
    },
  },
  persist: true,
})

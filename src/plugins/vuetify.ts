/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import i18n from '@/plugins/i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        colors: {
          background: '#0c111b',
          surface: '#2b374b',
          primary: '#D51F27',
          'primary-darken-1': '#AA191F',
          secondary: '#C3D1FF',
          'secondary-darken-1': '#9CA7CC',
          error: '#B00020',
          info: '#FFFFFF',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      light: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#f8f9fa', // Bootstrap light
          primary: '#0d6efd',
          'primary-darken-1': '#0b5ed7',
          secondary: '#6c757d',
          'secondary-darken-1': '#5c636a',
          error: '#dc3545',     // Bootstrap danger
          info: '#0dcaf0',      // Bootstrap info
          success: '#198754',   // Bootstrap success
          warning: '#ffc107',   // Bootstrap warning
        },
      },
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
})

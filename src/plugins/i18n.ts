// noinspection TypeScriptValidateTypes

import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { en as vuetifyEn, es as vuetifyEs } from 'vuetify/locale'
import playerEn from '@/locale/player/en.json'
import playerEs from '@/locale/player/es.json'
import routesEn from '@/locale/routes/en.json'
import routesEs from '@/locale/routes/es.json'

const supportedLocales = ['en', 'es']

let browserLocale = navigator.language.split('-')[0] // 'en-US' => 'en'

if (!supportedLocales.includes(browserLocale)) {
  browserLocale = import.meta.env.VITE_DEFAULT_LOCALE
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  allowComposition: true,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  warnHtmlMessage: false,
  globalInjection: true,
  runtimeOnly: false,
  messages: {
    en: {
      ...messages!.en,
      ...playerEn,
      ...routesEn,
      $vuetify: vuetifyEn,
    },
    es: {
      ...messages!.es,
      ...playerEs,
      ...routesEs,
      $vuetify: vuetifyEs,
    },
  },
})

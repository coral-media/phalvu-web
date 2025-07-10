/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import i18n from '@/plugins/i18n'
import screenSize from '@/plugins/screensize'

// Types
import type { App } from 'vue'
import { createHead } from '@unhead/vue/legacy'

export function registerPlugins (app: App) {
  app
    .use(i18n)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .use(screenSize, { globalInjection: false })
    .use(createHead())
}

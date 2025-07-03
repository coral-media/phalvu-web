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
import { createHead } from '@unhead/vue'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(screenSize, { globalInjection: false })
    .use(createHead())
}

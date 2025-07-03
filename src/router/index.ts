/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */
// Composable
import { createRouter, createWebHistory } from 'vue-router/auto'
// import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'
import i18n from '@/plugins/i18n'
import { useAppStore } from '@/stores/app'

export const i18nRoute = {
  path (path:string = ''): string {
    const locale = i18n.global.locale.value
    if (path !== '') {
      return i18n.global.t(path).replace(
      `/${locale}/`, `/:locale(${locale})/`
      )
    } else {
      return `/:locale(${locale})`
    }
  },
  alias (path:string = ''): string[] {
    const locale = i18n.global.locale.value
    if (path !== '') {
      return i18n.global.availableLocales
        .filter(value => value !== locale)
        .map(value => {
          return i18n.global.t(path, path, { locale: value }).replace(
            `/${value}/`, `/:locale(${value})/`
          )
        })
    } else {
      return i18n.global.availableLocales
        .filter(value => value !== locale)
        .map(value => `/:locale(${value})`)
    }
  },
}

const appLocalStorage = localStorage.getItem('app');

const localStorageLocale = appLocalStorage !== null
  ? JSON.parse(appLocalStorage).locale
  : import.meta.env.VIDE_DEFAULT_LOCALE

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      redirect: localStorageLocale !== import.meta.env.VIDE_DEFAULT_LOCALE
        ? `/${localStorageLocale}`
        : i18n.global.t('/'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: i18n.global.t('/')
    },
    {
      path: i18nRoute.path(),
      alias: i18nRoute.alias(),
      component: () => import('@/layouts/default.vue'),
      beforeEnter: (to: any) => {
        useAppStore().switchLocale(to.params.locale)
      },
      meta: {
        title: 'Hello World',
      },
      children: [
        {
          path: i18nRoute.path(),
          alias: i18nRoute.alias(),
          name: 'default',
          component: () => import('@/pages/index.vue'),
          meta: {
            title: 'Home',
          },
        },
        {
          path: i18nRoute.path(`/account/login`),
          alias: i18nRoute.alias(`/account/login`),
          name: '/account/login',
          component: () => import('@/pages/account/login.vue'),
          meta: {
            title: 'Login',
          },
        },
      ],
    },
  ],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export interface RouteParams {
  locale?: string;
}

export default router

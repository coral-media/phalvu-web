<template>
  <v-app>
    <AppHeader/>
    <v-main>
      <v-sheet class="pages-wrapper">
        <router-view/>
      </v-sheet>
    </v-main>
    <AppFooter/>
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'

const route = useRoute()
const { t, locale } = useI18n()

const headMeta = computed(() => {
  const titleKey = route.meta.title as string | undefined
  const pageTitle = titleKey ? t(titleKey) : 'Default Title'

  const currentLocale = (route.params as any).locale || locale.value
  const canonicalHref = `${window.location.origin}${route.fullPath}`

  const linkTags = [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'canonical',
      href: canonicalHref,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${window.location.origin}/${import.meta.env.VITE_DEFAULT_LOCALE}`,
    },
    ...['en', 'es'].map(l => ({
      rel: 'alternate',
      hreflang: l,
      href: `${window.location.origin}/${l}${route.path}`,
    })),
  ]

  return {
    title: pageTitle,
    htmlAttrs: {
      lang: currentLocale,
    },
    meta: [
      {
        charset: 'UTF-8',
      },
      {
        name: 'robots',
        content:
          import.meta.env.MODE === 'production'
            ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
            : 'noindex, nofollow',
      },
    ],
    link: linkTags,
  }
})

useHead(headMeta)
</script>

<style scoped lang="scss">
@use '@/styles/variables';

.pages-wrapper {
  width: 100vw !important;
}
</style>

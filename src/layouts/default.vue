<template>
  <v-app>
    <AppHeader />
    <v-main>
      <v-sheet class="pages-wrapper">
        <router-view />
      </v-sheet>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
  import { useHead, UseHeadInput } from '@unhead/vue'
  import { onMounted, onUpdated } from 'vue'
  import { RouteLocationNormalizedLoaded } from 'vue-router'
  import i18n from '@/plugins/i18n'
  import { useI18n } from 'vue-i18n'
  import { RouteParams } from '@/router'

  const appHeight = () => {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px')
  }

  const route = useRoute() as RouteLocationNormalizedLoaded & { params: RouteParams };
  const { t } = useI18n()

  const hrefLangMeta = () => {
    const links = [];
    for (const availableLocale of i18n.global.availableLocales) {
      links.push({
        rel: 'alternate',
        hreflang: availableLocale,
        href: `${window.location.origin}${t(route.name, {}, {locale: availableLocale})}`
      })
    }
    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${window.location.origin}${t(route.name, {}, { locale: import.meta.env.VITE_DEFAULT_LOCALE })}`
    })
    return links
  }

  const defaultLink = () => {
    return [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'canonical',
        href: `${window.location.origin}${route.fullPath}`,
      },
    ]
  }

  const meta: UseHeadInput = {
    title: route.meta.title as string,
    htmlAttrs: { lang: route.params.locale },
    meta: [
      {
        charset: 'UTF-8',
      },
      {
        name: 'robots',
        content: (import.meta.env.MODE === 'production')
          ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          : 'noindex, nofollow',
      },
    ],
    link: [
      ...defaultLink().map((link, index) => ({ ...link, key: `default-${index}` })), // Add unique keys
      ...hrefLangMeta().map((link, index) => ({ ...link, key: `hreflang-${index}` }))
    ]
  }

  onBeforeMount(() => {
    window.addEventListener('resize', appHeight)
    appHeight()
  })

  onMounted(() => {
    useHead(meta)
  })

  onUpdated(() => {
    useHead({
      ...meta,
      link: [
        ...defaultLink().map((link, index) => ({ ...link, key: `default-${index}` })),
        ...hrefLangMeta().map((link, index) => ({ ...link, key: `hreflang-${index}` })),
      ],
    });
  })

</script>

<style scoped lang="scss">
  @import 'src/styles/variables';

  .pages-wrapper {
    width: 100vw !important;
  }
</style>

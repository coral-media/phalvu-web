<template>
  <v-app-bar absolute color="surface" class="justify-center" :height="88">
    <template v-slot:prepend>
      <router-link :to="{ path: t('/') }">
        <v-img
          height="48"
          src="@/assets/logo.png"
          width="48"
        />
      </router-link>
    </template>
    <v-app-bar-title>Bible Miner</v-app-bar-title>
    <template v-if="!$vuetify.display.mobile">
      <search-form class="mr-10" />
      <v-btn
        v-if="route.path !== t('/account/login')"
        color="primary"
        :ripple="true"
        :to="t('/account/login')"
        variant="flat"
      >
        {{ t('sign in') }}
      </v-btn>
      <locale-switcher class="ml-3" />
      <theme-switcher />
    </template>
    <template v-if="$vuetify.display.mobile" v-slot:append>
      <v-app-bar-nav-icon variant="text" aria-label="Menu Drawer" @click.stop="drawer = !drawer" />
    </template>
  </v-app-bar>
  <v-navigation-drawer
    class="d-flex flex-row justify-center justify-content-center"
    v-if="$vuetify.display.mobile && drawer"
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'top' : undefined"
    temporary
  >
    <v-list>
      <v-list-item>
        <search-form />
      </v-list-item>
      <v-list-item v-if="route.path !== t('/account/login')">
        <v-btn
          v-if="route.path !== t('/account/login')"
          color="primary"
          :ripple="true"
          :to="t('/account/login')"
          variant="flat"
        >
          {{ t('sign in') }}
        </v-btn>
      </v-list-item>
      <v-list-item>
        <locale-switcher />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

  import { useI18n } from 'vue-i18n'
  import { RouteLocationNormalizedLoaded } from 'vue-router'

  const route = useRoute() as RouteLocationNormalizedLoaded;

  const { t } = useI18n()

  const drawer = ref(false)
  const group = ref(null)

  watch(group, () => {
    drawer.value = false
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables';

  .v-app-bar {
    position: fixed !important;
    //height: $app-bar-height;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
  }
  .blurred {
    filter: blur(8px);
  }
</style>

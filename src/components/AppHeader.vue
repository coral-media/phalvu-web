<template>
  <v-app-bar absolute color="surface" class="justify-center" :height="88">
    <template v-slot:prepend>
      <router-link :to="{ path: t('/') }">
        <v-img v-if="isDark"
          height="64"
          src="@/assets/logo-dark.png"
          width="64"
        />
        <v-img v-else
               height="64"
               src="@/assets/logo.png"
               width="64"
        />
      </router-link>
    </template>
    <v-app-bar-title>PhalVu</v-app-bar-title>
    <template v-if="!$vuetify.display.mobile">
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
  import { computed, ref, watch } from 'vue'
  import { useTheme } from 'vuetify'

  const route = useRoute() as RouteLocationNormalizedLoaded;

  const { t } = useI18n()

  const drawer = ref(false)
  const group = ref(null)

  const theme = useTheme();
  const isDark = computed(() => theme.global.name.value === 'dark');

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

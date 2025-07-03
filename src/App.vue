<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { useVersionStore } from '@/stores/bible/version'
  import { useBookStore } from '@/stores/bible/book'

  onBeforeMount( async () => {
    await useVersionStore().fetchBibleVersions().then(()=>useBookStore().fetchBibleBooks())
  })
</script>

<style lang="scss" scoped>
</style>

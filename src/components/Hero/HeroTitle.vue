<template>
  <h1>{{ bibleVersion?.title }}</h1>
</template>

<script lang="ts" setup>
import { IBibleVersion } from '@/model/IBibleVersion'
import { useVersionStore } from '@/stores/bible/version'

const bibleVersion = computed<IBibleVersion | undefined>(() => useVersionStore().currentBibleVersion);
</script>

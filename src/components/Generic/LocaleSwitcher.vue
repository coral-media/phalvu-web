<template>
    <v-select
      v-model="selectedLocale"
      class="font-weight-bold text-uppercase align-self-center"
      density="compact"
      item-title="locale"
      item-value="locale"
      :items="items"
      :rounded="true"
      variant="plain"
      @update:modelValue="switchLanguage"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" :subtitle="item.raw.label" />
      </template>
    </v-select>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useAppStore } from '@/stores/app'
  import router from '@/router'

  const { t } = useI18n()
  const appStore = useAppStore()

  const props = defineProps({
    refreshPage: {
      type: Boolean,
      default: true,
    },
  })

  const items = [
    { locale: 'es', title: 'es', label: t('locale.label.es') },
    { locale: 'en', title: 'en', label: t('locale.label.en') },
  ]

  const selectedLocale = computed({
    get: () => appStore.locale,
    set: (val) => appStore.switchLocale(val),
  })

  const switchLanguage = (locale: string) => {
    selectedLocale.value = locale as 'en' | 'es'

    if (props.refreshPage) {
      if (router.currentRoute.value.name && router.currentRoute.value.name !== '/') {
        router.push({ path: t(`${router.currentRoute.value.name}`) })
      } else {
        window.location.href = `/${locale}`
      }
    }
  }
</script>

<style lang="scss" scoped>
.v-select {
  max-width:64px;
  max-height: 36px;
}
:deep(.v-field--rounded) {
  border-radius: 14px !important;
}
:deep(.v-list-item-title) {
  font-weight: bold;
  text-transform: uppercase;
}
:deep(.v-list-item__content) {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

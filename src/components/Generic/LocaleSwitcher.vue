<template>
  <v-form>
    <v-select
      v-model="selectedLocale"
      class="font-weight-bold text-uppercase d-flex align-items-center"
      density="compact"
      item-title="locale"
      item-value="locale"
      :items="items"
      :rounded="true"
      variant="outlined"
      @update:modelValue="switchLanguage"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" :subtitle="item.raw.label" />
      </template>
    </v-select>
  </v-form>
</template>

<script lang="ts" setup>
  import { useLocale } from 'vuetify'
  import { ref } from 'vue'
  import router from '@/router'
  import { useAppStore } from '@/stores/app'

  const { t } = useLocale()

  const props = defineProps({
    refreshPage: {
      type: Boolean,
      default: true,
    },
  })

  const items = [
    {
      locale: 'es',
      title: 'ES',
      label: t('locale.label.es'),
    },
    {
      locale: 'en',
      title: 'EN',
      label: t('locale.label.en'),
    },
  ]

  const selectedLocale:Ref<string> = ref(useAppStore().locale)

  const switchLanguage = (locale:any) => {
    useAppStore().switchLocale(locale)
    if (props.refreshPage) {
      //@ts-ignore
      if(router.currentRoute.value.name !== 'default') {
        router.push({path: t(`${router.currentRoute.value.name}`)})
      } else {
        window.location.href = `/${locale}`
      }
    }
  }
</script>

<style lang="scss" scoped>
:deep(.v-field--rounded) {
  border-radius: 14px !important;
}
:deep(.v-list-item-title) {
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
}
</style>

<template>
  <v-switch
    v-model="isDark"
    inset
    hide-details
    class="theme-switch"
  >
    <template v-slot:thumb>
      <v-icon color="primary-darken-1">{{ isDark ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
    </template>
  </v-switch>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { useAppStore } from '@/stores/app'

const theme = useTheme()
const appStore = useAppStore()

const isDark = ref(theme.global.name.value === 'dark')

onMounted(() => {
  const storedTheme = appStore.theme
  theme.change(storedTheme)
  isDark.value = storedTheme === 'dark'
})

watch(isDark, (val) => {
  const newTheme = val ? 'dark' : 'light'
  appStore.switchTheme(newTheme)
  theme.change(newTheme)
})
</script>

<style scoped lang="scss">
@use '@/styles/variables' as v;

.theme-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto; /* Let the switch size adjust dynamically */
}

.theme-switch .v-icon {
  font-size: 18px;
}

:deep(.v-switch__thumb) {
  background-color: rgb(var(--v-theme-background)) !important;
}
:deep(.v-switch__track) {
  background-color: rgb(var(--v-theme-secondary)) !important;
}
</style>

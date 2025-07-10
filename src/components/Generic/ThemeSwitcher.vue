<template>
  <v-switch
    v-model="isDark"
    inset
    hide-details
    class="theme-switch"
  >
    <template v-slot:thumb>
      <v-icon color="primary-darken">{{ isDark ? 'mdi-moon-waxing-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
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

// Initialize theme from store on mount
onMounted(() => {
  const storedTheme = appStore.theme
  theme.global.name.value = storedTheme
  isDark.value = storedTheme === 'dark'
})

// Sync Vuetify + store when switch toggled
watch(isDark, (val) => {
  const newTheme = val ? 'dark' : 'light'
  theme.global.name.value = newTheme
  appStore.switchTheme(newTheme)
})
</script>

<style scoped lang="scss">
@use '@/styles/variables';

.theme-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto; /* Let the switch size adjust dynamically */
}

.theme-switch .v-icon {
  font-size: 18px;
}
</style>

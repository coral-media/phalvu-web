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
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

const isDark = ref(theme.global.name.value === 'dark');

watch(isDark, (newValue) => {
  theme.global.name.value = newValue ? 'dark' : 'light';
});
</script>

<style scoped lang="scss">
@import 'src/styles/variables';

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

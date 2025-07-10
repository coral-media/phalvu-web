<template>
  <v-form @submit.prevent>
    <v-text-field
      clearable
      label="Email"
      placeholder="johndoe@gmail.com"
      type="email"
      autocomplete="email"
    />
    <v-text-field
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      clearable
      label="Password"
      placeholder="Password"
      :type="showPassword ? 'text' : 'password'"
      @click:append-inner="showPassword = !showPassword"
      autocomplete="current-password"
    />
    <v-btn
      color="primary"
      height="56"
      :text="t('sign in')"
    />
  </v-form>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const showPassword = ref(false)
  const { t } = useI18n()
</script>

<style lang="scss" scoped>

</style>

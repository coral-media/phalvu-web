<template>
  <v-container class="login-page">
    <h1>{{t('sign in')}}</h1>
    <div class="login-form-wrapper">
      <LoginForm />
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import LoginForm from '@/components/Form/LoginForm.vue'

  import { useI18n } from 'vue-i18n'

  const {t} = useI18n()
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .login-form-wrapper {
    max-height: 50vh;
    width: 80vw;
  }
}
</style>

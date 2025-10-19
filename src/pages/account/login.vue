<template>
  <v-container class="login-page">
    <h1 class="mb-4">{{ t('sign in') }}</h1>

    <div class="login-form-wrapper">
      <LoginForm @login="handleLogin" />
    </div>

    <v-alert
      v-if="errorMessage"
      :type="alertType"
      class="my-4"
      density="compact"
      variant="tonal"
      closable
      @click:close="errorMessage = ''"
    >
      {{ errorMessage }}
    </v-alert>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { useRouter } from 'vue-router'
import { axiosInstance } from '@/services/api'
import LoginForm from '@/components/Form/LoginForm.vue'

const { t } = useI18n()
const router = useRouter()
const store = useAppStore()

const errorMessage = ref('')
const alertType = ref<'error' | 'warning' | 'success' | 'info'>('error')

async function handleLogin(payload: { email: string; password: string }) {
  try {
    const { data } = await axiosInstance.post('/security/login', payload)
    store.setAuth(data)
    await router.push({ name: '/' })
  } catch (err: any) {
    errorMessage.value = t(err.response?.data?.message || 'Login failed')
    alertType.value = 'error'
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-form-wrapper {
  width: 100%;
  @media (min-width: 960px) {
    max-width: 600px !important;
  }
}
</style>

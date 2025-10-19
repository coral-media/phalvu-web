<!-- src/components/Form/LoginForm.vue -->
<template>
  <v-form @submit.prevent="onSubmit" ref="formRef" v-model="valid">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      clearable
      label="Email"
      placeholder="johndoe@gmail.com"
      type="email"
      autocomplete="email"
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      clearable
      label="Password"
      placeholder="Password"
      :type="showPassword ? 'text' : 'password'"
      @click:append-inner="showPassword = !showPassword"
      autocomplete="current-password"
    />
    <v-btn
      :disabled="!valid"
      color="primary"
      height="56"
      type="submit"
    >
      {{ t('sign in') }}
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const valid = ref(false)
const formRef = ref()

const emailRules = [
  (v: string) => !!v || t('email is required'),
  (v: string) => /.+@.+\..+/.test(v) || t('invalid email'),
]

const passwordRules = [
  (v: string) => !!v || t('password is required'),
  (v: string) => v.length >= 6 || t('password must be at least 6 characters'),
]

// emit login event to parent if form is valid
const emit = defineEmits<{
  (e: 'login', payload: { email: string; password: string }): void
}>()

const onSubmit = () => {
  if (formRef.value?.validate()) {
    emit('login', { email: email.value, password: password.value })
  }
}
</script>

<style lang="scss" scoped>

</style>

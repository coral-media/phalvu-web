<template>
  <v-form @submit.prevent>
    <v-text-field clearable label="Email" placeholder="johndoe@gmail.com" type="email" />
    <v-text-field
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      clearable
      label="Password"
      placeholder="Password"
      :type="showPassword ? 'text' : 'password'"
      @click:append-inner="showPassword = !showPassword"
    />
    <v-btn
      color="primary"
      height="56"
      text="Sign in"
    />
  </v-form>
</template>

<script lang="ts" setup>
  const showPassword = ref(false)
</script>

<style lang="scss" scoped>

</style>

<template>
  <form @submit.prevent="submit">
    <label for="email">Email Address</label>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Email Address"
      :disabled="loading"
      @focus="email.clearError"
      v-model="email.value"
    />
    <p class="err" v-if="email.hasError">{{ email.error?.message }}</p>
    <hr />
    <label for="email">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      :disabled="loading"
      @focus="password.clearError"
      v-model="password.value"
    />
    <p class="err" v-if="password.hasError">{{ password.error?.message }}</p>
    <hr />
    <button type="submit" :disabled="loading">Login</button>
    <button :disabled="loading" @click.prevent="manualError">Manual error on Password</button>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from '@/../../..';

const sleep = (length: number) => new Promise(resolve => window.setTimeout(resolve, length * 1000));

const { useField, handle, loading } = useForm<{
  email: string;
  password: string;
}>({
  defaults: {
    email: 'hello@example.com',
  },
});

const email = useField('email', {
  required: true,
});
const password = useField('password', {
  required: true,
});

const submit = handle(async ({ email, password }) => {
  await sleep(2);
  alert(`Email: ${email} Password: ${password}`);
});

const manualError = () => {
  password.setError('Random error 123');
};
</script>

<style>
.err {
  color: red;
}
</style>

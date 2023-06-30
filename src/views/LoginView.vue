<template>
  <div class="w-full flex items-center justify-center">
    <div class="responsive-width border p-4 rounded-md pb-11">
      <div class="flex justify-center pb-5 text-xl">Вход</div>
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import LoginForm from "../components/LoginForm.vue";
</script>

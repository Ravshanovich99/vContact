<template>
  <form
    @submit.prevent="onLogin"
    class="w-full flex flex-col items-center justify-center gap-6"
  >
    <Input
      v-model="email"
      :type="'email'"
      :label="'Введите email'"
      :required="true"
      @isValid="isValidEmail = $event"
    />

    <Input
      v-model="password"
      :type="'password'"
      :label="'Введите пароль'"
      :required="true"
      @isValid="isValidPassword = $event"
    />
    <div class="w-full flex justify-start items-start cursor-pointer underline">
      <RouterLink to="/register">Ещё не аккаунта ?</RouterLink>
    </div>

    <Button type="submit" :disabled="!isValidEmail || !isValidPassword">
      Submit
    </Button>
  </form>
  <Toast
    :type="toastType"
    :message="toastMessage"
    @closeToast="toastMessage = null"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import Toast from "./Toast.vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

// states
const isValidEmail = ref<boolean>(false);
const isValidPassword = ref<boolean>(false);
const email = ref<string>("");
const password = ref<string>("");
const router = useRouter();

const toastType = ref<string>("");
const toastMessage = ref<string>("");

// methods
const onLogin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.email !== email.value) {
    toastType.value = "error";
    toastMessage.value = "Нет такого пользователя";
  } else if (user.password !== password.value) {
    toastType.value = "error";
    toastMessage.value = "Ошибка пароля";
  } else {
    Cookies.set("user_logged_in_token", "your_logged_in_token_here");
    router.push("/");
  }
};
</script>

<style scoped></style>

<template>
  <form
    @submit.prevent="onRegister"
    class="w-full flex flex-col items-center justify-center gap-6"
  >
    <Input
      v-model="name"
      :type="'text'"
      :label="'Введите имя'"
      :required="true"
      @isValid="isValidName = $event"
    />
    <Input
      v-model="phone"
      :type="'tel'"
      :label="'Введите номер телефона'"
      :required="true"
      @isValid="isValidPhone = $event"
    />
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

    <div
      v-if="!update"
      class="w-full flex justify-start items-start cursor-pointer underline"
    >
      <RouterLink to="/login">Уже есть аккаунт ?</RouterLink>
    </div>

    <Button v-if="update" type="submit"> Обновить </Button>
    <Button
      v-else
      type="submit"
      :disabled="
        !isValidEmail || !isValidPassword || !isValidName || !isValidPhone
      "
    >
      Регистрироваться
    </Button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import { useRouter } from "vue-router";
import { UserModel } from "../models/user-model";

interface Props {
  userUpdate?: UserModel;
  update?: boolean;
}

interface Emits {
  onUpdateProfile: (user: UserModel) => void;
}

// Props
const props = defineProps<Props>();

// Emits
const emit = defineEmits<Emits>();

// States
const isValidPhone = ref<boolean>(false);
const isValidName = ref<boolean>(false);
const isValidEmail = ref<boolean>(false);
const isValidPassword = ref<boolean>(false);
const email = ref<string>("");
const password = ref<string>("");
const name = ref<string>("");
const phone = ref<string>("");
const router = useRouter();

// Methods
onMounted(() => {
  if (props.update) {
    name.value = props.userUpdate?.name || "";
    email.value = props.userUpdate?.email || "";
    phone.value = props.userUpdate?.phone || "";
    password.value = props.userUpdate?.password || "";
  }
});

const onRegister = () => {
  const user: UserModel = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    password: password.value,
  };

  localStorage.setItem("user", JSON.stringify(user));

  if (props.update) {
    emit("onUpdateProfile", user);
    return;
  }

  router.push("/");
};
</script>

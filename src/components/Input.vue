<template>
  <div class="w-full relative flex flex-col">
    <input
      :type="type"
      :value="modelValue"
      @input="onChange($event.target.value)"
      class="w-full bg-transparent border rounded-md w-1/2 border-gray-300 py-2 pl-2 pr-8 outline-none"
      :class="errorMessage ? 'border-red-500' : 'focus:border-blue-500'"
    />

    <label
      class="label absolute left-2 top-2 text-gray-500 transition-all duration-300"
      :class="[modelValue && 'with-value', errorMessage && 'text-red-500']"
    >
      {{ label }}
    </label>
    <small v-show="errorMessage" class="text-red-500">{{ errorMessage }}</small>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

// props
const props = defineProps<{
  modelValue?: string;
  type?: string;
  label?: string;
  required?: boolean;
}>();

// emits
const emit = defineEmits<{
  "update:modelValue": (value: string) => void;
  isValid: (valid: boolean) => void;
}>();

// states
const errorMessage = ref<string>("");

// methods
const onChange = (value: string) => {
  validate(value);
  emit("update:modelValue", value);
};

const validate = (value: string) => {
  if (props.required) {
    if (props.type === "email") {
      !emailValidate(value)
        ? (errorMessage.value = "your@example.com")
        : (errorMessage.value = "");
    }

    if (props.type === "tel") {
      !phoneNumberValidate(+value)
        ? (errorMessage.value = "Введите номер телефона")
        : (errorMessage.value = "");
    }

    if (props.type === "text") {
      !nameValidate(value)
        ? (errorMessage.value = "Введите минимум 3 символа")
        : (errorMessage.value = "");
    }

    if (props.type === "password") {
      !passwordValidate(value)
        ? (errorMessage.value = "Пароль должен быть не менее 6 символов")
        : (errorMessage.value = "");
    }

    emit("isValid", !errorMessage.value);
  }
};

const emailValidate = (value: string) => {
  const emailTest =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailTest.test(value);
};

const passwordValidate = (value: string) => {
  return value.trim().length >= 6;
};

const phoneNumberValidate = (value: number) => {
  if (isNaN(value)) {
    return false;
  }
  return true;
};

const nameValidate = (value: string) => {
  return value.length > 2;
};
</script>

<style scoped>
input:focus + label,
.with-value {
  top: -0.8rem;
  font-size: 0.8rem;
}
</style>

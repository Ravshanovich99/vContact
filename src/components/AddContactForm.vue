<template>
  <form
    @submit.prevent="onSaveContact"
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
    <Input v-model="group" :type="'text'" :label="'Группировка'" />
    <Button v-if="editContact" type="submit">Изменить</Button>
    <Button
      v-else
      type="submit"
      :disabled="!isValidPhone || !isValidName || !isValidEmail"
      >Добавить</Button
    >
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { ContactModel } from "../models/contact-model";

// props
const props = defineProps<{
  editContact?: ContactModel;
}>();

// emits
const emit = defineEmits(["onAddContact", "onSaveEditContact"]);

// states
const isValidPhone = ref<boolean>(false);
const isValidName = ref<boolean>(false);
const isValidEmail = ref<boolean>(false);
const name = ref<string>("");
const phone = ref<string>("");
const email = ref<string>("");
const group = ref<string>("");
const router = useRouter();

onMounted(() => {
  if (props.editContact && Object.keys(props.editContact).length > 0) {
    name.value = props.editContact.name;
    email.value = props.editContact.email;
    phone.value = props.editContact.phone;
    group.value = props.editContact.group;
  }
});

// methods
const onSaveContact = () => {
  const newContact: ContactModel = {
    id: props.editContact?.id || uuidv4(),
    name: name.value,
    phone: phone.value,
    email: email.value,
    group: group.value,
  };
  if (props.editContact && Object.keys(props.editContact).length > 0) {
    emit("onSaveEditContact", newContact);
  } else {
    emit("onAddContact", newContact);
  }
};
</script>

<template>
  <div
    class="flex items-center border border-gray-300 p-4 mb-4 rounded-lg shadow-md"
  >
    <div class="flex-1">
      <div class="text-xl font-bold">{{ contact.name }}</div>
      <div class="text-gray-600">{{ contact.phone }}</div>
      <div class="text-gray-600">{{ contact.email }}</div>
      <div class="w-fit p-1 text-xs rounded-xl custom-bg">
        {{ contact.group }}
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button
        @click="editContact(contact)"
        class="rounded-full p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-200"
      >
        <Edit class="scale-125" />
      </button>
      <button
        @click="deleteContact(contact.id)"
        class="rounded-full p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-200"
      >
        <Delete class="scale-125" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Delete from "./icons/Delete.vue";
import Edit from "./icons/Edit.vue";
import { ContactModel } from "../models/contact-model";

// props
const props = defineProps<{
  contact: ContactModel;
}>();

// emits
const emit = defineEmits<{
  onEditContact: (contact: ContactModel) => void;
  onDeleteContact: (id: string) => void;
}>();

// methods
const editContact = (contact: ContactModel) => {
  emit("onEditContact", contact);
};

const deleteContact = (id: string) => {
  emit("onDeleteContact", id);
};
</script>

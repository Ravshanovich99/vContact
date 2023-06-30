<template>
  <div class="relative">
    <main>
      <Input
        v-model="searchValue"
        :type="'text'"
        :label="'Поиск'"
        @input="onSearch"
      />
      <div class="mt-5">
        <ContactCard
          v-for="contact in contacts"
          :key="contact.id"
          :contact="contact"
          @onEditContact="onEditContact($event)"
          @onDeleteContact="onDeleteContact($event)"
        />
      </div>
    </main>
    <div class="absolute -bottom-12 right-0 mb-6 mr-6">
      <Button
        class="rounded-full p-4 shadow-xl bg-gray-200"
        @click="contactModal = true"
      >
        <Plus class="scale-150" />
      </Button>
    </div>
    <div v-if="contactModal">
      <Modal @closeModal="contactModal = false" :header="'Добавить контакт'">
        <AddContactForm @onAddContact="onAddContact($event)" />
      </Modal>
    </div>
    <div v-if="editingContact">
      <Modal @closeModal="editingContact = null" :header="'Изменить контакт'">
        <AddContactForm
          :editContact="editingContact"
          @onSaveEditContact="onSaveEditContact($event)"
        />
      </Modal>
    </div>
    <Toast
      :type="toastType"
      :message="toastMessage"
      @closeToast="toastMessage = null"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Input from "../components/Input.vue";
import Plus from "../components/icons/Plus.vue";
import AddContactForm from "../components/AddContactForm.vue";
import Modal from "../components/Modal.vue";
import ContactCard from "../components/ContactCard.vue";
import Toast from "../components/Toast.vue";
import { ContactModel } from "../models/contact-model";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  group: string;
}

// states
const contactModal = ref<boolean>(false);
const editingContact = ref<ContactModel | null>(null);
const searchValue = ref<string>("");
const toastType = ref<string>("");
const toastMessage = ref<string>("");
const contacts = ref<ContactModel[]>([
  {
    id: "1",
    name: "John Smith",
    phone: "(555) 123-4567",
    email: "johnsmith@email.com",
    group: "Friends",
  },
  {
    id: "2",
    name: "Jane Doe",
    phone: "(555) 987-6543",
    email: "janedoe@email.com",
    group: "Family",
  },
  {
    id: "3",
    name: "David Johnson",
    phone: "(555) 789-0123",
    email: "davidjohnson@email.com",
    group: "Work",
  },
]);

// methods
onMounted(() => {
  if (!localStorage.getItem("contacts")) {
    localStorage.setItem("contacts", JSON.stringify(contacts.value));
  } else {
    contacts.value = JSON.parse(localStorage.getItem("contacts") || "");
  }
});

const onUpdateLocalStorage = () => {
  localStorage.setItem("contacts", JSON.stringify(contacts.value));
};

const onAddContact = (contact: ContactModel) => {
  contacts.value = [...contacts.value, contact];
  onUpdateLocalStorage();
  contactModal.value = false;
  toastType.value = "success";
  toastMessage.value = "Добавлено!";
};

const onDeleteContact = (id: string) => {
  contacts.value = contacts.value.filter((contact) => contact.id !== id);
  onUpdateLocalStorage();
  toastType.value = "success";
  toastMessage.value = "Удалено!";
};

const onEditContact = (contact: ContactModel) => {
  editingContact.value = contact;
};

const onSaveEditContact = (contact: ContactModel) => {
  contacts.value = contacts.value.map((_contact: ContactModel) =>
    _contact.id === contact.id ? contact : _contact
  );
  onUpdateLocalStorage();
  toastType.value = "success";
  toastMessage.value = "Изменено!";
  editingContact.value = null;
};

const onSearch = () => {
  if (searchValue.value) {
    contacts.value = contacts.value.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchValue.value.toLowerCase()) ||
        contact.group.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  } else {
    contacts.value = JSON.parse(localStorage.getItem("contacts") || "");
  }
};
</script>

<template>
  <div class="min-h-screen py-10">
    <div class="max-w-xl mx-auto p-8 shadow-md rounded-lg card">
      <div class="flex justify-between items-end">
        <div>
          <h2 class="text-2xl font-semibold mb-4 green">Profile</h2>
          <div>
            <p class="text-default font-medium mb-2">
              <span class="font-bold">Name:</span> {{ user?.name }}
            </p>
          </div>
          <div class="mt-4">
            <p class="text-default font-medium mb-2">
              <span class="font-bold">Email:</span> {{ user?.email }}
            </p>
          </div>
          <div class="mt-4">
            <p class="text-default font-medium mb-2">
              <span class="font-bold">Phone:</span> {{ user?.phone }}
            </p>
          </div>
        </div>
        <button
          @click="editProfile = true"
          class="rounded-full w-8 h-8 p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-200"
        >
          <Edit class="scale-125" />
        </button>
      </div>
    </div>
  </div>
  <Modal
    v-if="editProfile"
    @closeModal="editProfile = false"
    :header="'Изменить профиль'"
  >
    <RegisterForm
      :userUpdate="user"
      :update="true"
      @onUpdateProfile="onUpdateProfile($event)"
    />
  </Modal>
  <Toast
    :type="toastType"
    :message="toastMessage"
    @closeToast="toastMessage = ''"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { UserModel } from "../models/user-model";
import Edit from "../components/icons/Edit.vue";
import RegisterForm from "../components/RegisterForm.vue";
import Modal from "../components/Modal.vue";
import Toast from "../components/Toast.vue";

// states
const editProfile = ref<boolean>(false);
const toastType = ref<string>("");
const toastMessage = ref<string>("");

// methods
const user = ref<UserModel | null>(null);

onMounted(() => {
  if (!user.value) {
    user.value = JSON.parse(localStorage.getItem("user"));
  }
});

const onUpdateProfile = (updatedUser: UserModel) => {
  user.value = updatedUser;
  editProfile.value = false;
  toastType.value = "success";
  toastMessage.value = "Обновлено";
};
</script>

<template>
  <div class="block z-50 modal-open">
    <div
      class="fixed z-50 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.9)] flex items-center justify-center"
    >
      <div
        class="bg-modal responsive-width rounded-md"
        :style="{ maxWidth: dataContainerWidth }"
      >
        <div>
          <div
            class="pl-2 pb-2 mb-2 pt-1 flex justify-between items-center border-b"
          >
            <div class="text-lg fw-6">
              {{ header }}
            </div>
            <div>
              <div
                @click="closeModal"
                class="rounded-md cursor-pointer border flex items-center p-1 justify-center text-lg mr-1"
              >
                <span><Close /></span>
              </div>
            </div>
          </div>
          <div class="flex relative pt-2 pb-4 px-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, defineProps, defineEmits } from "vue";
import Close from "../components/icons/Close.vue";

// props
const props = defineProps<{
  header?: string;
  dataContainerWidth?: string;
}>();

// emits
const emit = defineEmits<{
  closeModal: () => void;
}>();

const closeModal = () => {
  emit("closeModal");
};

onMounted(() => {
  document.body.classList.add("modal-open"); // Add the class to disable scrolling when the modal is mounted
});

onBeforeUnmount(() => {
  document.body.classList.remove("modal-open"); // Remove the class to re-enable scrolling when the modal is unmounted
});
</script>

<style>
body.modal-open {
  overflow-y: hidden;
}
</style>

<template>
  <div>
    <div
      v-if="isToastVisible"
      class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50"
    >
      <div
        class="max-w-sm w-full toast shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="p-4">
          <div class="flex items-center">
            <div v-show="type === 'success'" class="flex-shrink-0">
              <Check />
            </div>
            <div v-show="type === 'error'" class="flex-shrink-0">
              <Close :color="'#EF4444'" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p
                v-show="type === 'success'"
                class="text-sm font-medium text-gray-400"
              >
                Успешно
              </p>
              <p
                v-show="type === 'error'"
                class="text-md font-medium text-gray-400"
              >
                Ошибка
              </p>
              <p class="mt-1 text-sm text-gray-300">{{ message }}</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="hideToast"
                class="inline-flex text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <Close />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineProps, defineEmits } from "vue";
import Close from "../components/icons/Close.vue";
import Check from "../components/icons/Check.vue";

// Props
const props = defineProps<{
  type: string;
  message?: string;
}>();

// Emits
const emit = defineEmits<{
  closeToast: () => void;
}>();

// States
const isToastVisible = ref(false);

// Methods
const showToast = () => {
  isToastVisible.value = true;
};

const hideToast = () => {
  isToastVisible.value = false;
  emit("closeToast");
};

const autoHideToast = () => {
  setTimeout(hideToast, 3000);
};

watchEffect(() => {
  if (props.message) {
    showToast();
    autoHideToast();
  }
});
</script>

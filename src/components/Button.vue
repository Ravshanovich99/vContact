<template>
  <button
    :type="type"
    class="btn w-full p-2 rounded-md cursor-pointer"
    :class="disabled && 'opacity-50 cursor-not-allowed'"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  disabled?: boolean;
  type?: string;
}>();
</script>

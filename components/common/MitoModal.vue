<script setup lang="ts">
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <teleport to="#mito-modals">
    <div
      v-if="isOpen"
      class="flex items-center justify-center fixed w-[100vw] h-[100vh] bg-gray-600 bg-opacity-50 z-[100]"
      @click.stop
    >
      <slot />
    </div>
  </teleport>
</template>

<style scoped></style>

<script setup lang="ts">
const props = defineProps({
  route: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="bg-navy-blue text-white text-lg w-full p-4 flex items-center z-2 shadow-md"
  >
    <div class="px-2">
      <img
        src="/assets/mito-plus.svg"
        alt="plus"
        :class="{ 'cursor-pointer': route }"
        @click="navigateTo(route)"
      />
    </div>
    <div class="px-2">
      <slot />
    </div>
  </div>
</template>

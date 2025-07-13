<script setup lang="ts">
import type { PropType } from "vue";

interface SpringWidths {
  "max-w-sm": boolean;
  "max-w-md": boolean;
  "max-w-lg": boolean;
}

const props = defineProps({
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
});

const sizeClass = ref<SpringWidths>({
  "max-w-sm": false,
  "max-w-md": false,
  "max-w-lg": false,
});

onMounted(() => {
  sizeClass.value[`max-w-${props.size}`] = true;
});
</script>

<template>
  <div
    class="mx-auto px-6"
    :class="{
      ...sizeClass,
    }"
  >
    <slot />
  </div>
</template>

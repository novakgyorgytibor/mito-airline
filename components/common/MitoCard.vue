<script setup lang="ts">
import MitoHeader from "~/components/common/MitoHeader.vue";

defineProps({
  displayHeader: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="bg-white drop-shadow-md">
    <MitoHeader v-if="displayHeader">
      <div class="font-semibold">
        <slot name="header" />
      </div>
    </MitoHeader>
    <slot name="custom-header" />
    <div>
      <slot name="content" />
    </div>
  </div>
</template>

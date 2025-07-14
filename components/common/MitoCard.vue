<script setup lang="ts">
import MitoHeader from "~/components/common/MitoHeader.vue";
</script>

<template>
  <div class="bg-white drop-shadow-md">
    <MitoHeader>
      <slot name="header" />
    </MitoHeader>
    <div class="p-6">
      <slot name="content" />
    </div>
  </div>
</template>

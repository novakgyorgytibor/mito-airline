<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "~/stores/checkout";

const checkoutStore = useCheckoutStore();
const { setSearchFormData } = checkoutStore;
const { searchFormData } = storeToRefs(checkoutStore);
</script>

<template>
  <div class="bg-tutu text-lipstick">{{ searchFormData }}</div>
</template>

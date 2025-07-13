<script setup lang="ts">
const { $api } = useNuxtApp();

onMounted(async () => {
  let flights: object | any = await $api.get("/flights");
  console.log(flights);
});
</script>

<template>
  <div class="bg-tutu text-lipstick">Select flight</div>
</template>

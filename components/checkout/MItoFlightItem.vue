<script setup lang="ts">
import type { PropType } from "vue";
import type { Flight, CartItem } from "~/types";
import moment from "moment";

const emits = defineEmits<{
  (e: "update:selectedFlight", payload: CartItem): void;
}>();

const props = defineProps({
  flight: {
    type: Object as PropType<Flight>,
    required: true,
  },
});

function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
</script>

<template>
  <div class="flex justify-around items-center border-t-1 border-t-[#343434]">
    <div class="w-1/4 p-3 text-[#343434] text-sm">
      {{ moment(flight.departureDateTime).format("HH:MM") }}
      <Icon name="ci:arrow-right-lg translate-y-[2px]" />
      {{ moment(flight.arrivalDateTime).format("HH:MM") }}
    </div>
    <div
      v-for="(fare, index) in flight.fares"
      :key="index"
      class="w-1/4 p-3 text-center"
      :class="{
        'bg-[#F2F2F2]': index % 2,
      }"
      @click="emits('update:selectedFlight', { ...flight, selectedFare: fare })"
    >
      <div
        class="cursor-pointer border-lipstick border-2 inline-block p-2 font-bold hover:text-white hover:bg-lipstick focus:text-white focus:bg-lipstick"
      >
        {{ fare.price.currencyCode }} {{ formatPrice(fare.price.amount) }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

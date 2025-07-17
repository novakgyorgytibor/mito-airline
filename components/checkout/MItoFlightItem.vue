<script setup lang="ts">
import type { PropType } from "vue";
import type { Flight, CartItem } from "~/types";
import moment from "moment";

const emits = defineEmits<{
  (e: "update:selectedFlight", payload: CartItem | undefined): void;
}>();

const props = defineProps({
  flight: {
    type: Object as PropType<Flight>,
    required: true,
  },
  selectedFlight: {
    type: Object as PropType<CartItem | undefined>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  displayBundle: {
    type: Boolean,
    default: false,
  },
});

function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function isSelected(flight: CartItem) {
  return (
    props.selectedFlight?.id === flight.id &&
    props.selectedFlight.selectedFare.bundle === flight.selectedFare.bundle
  );
}

function onBundleClick(flight: CartItem) {
  if (isSelected(flight)) {
    emits("update:selectedFlight", undefined);
    return;
  }
  emits("update:selectedFlight", flight);
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row justify-around items-center border-t-2 border-t-[#E5E5E5]"
  >
    <div class="md:w-1/4 p-3 text-[#343434] text-sm">
      {{ moment(flight.departureDateTime).format("HH:MM") }}
      <Icon name="ci:arrow-right-lg translate-y-[2px]" />
      {{ moment(flight.arrivalDateTime).format("HH:MM") }}
    </div>
    <div
      v-for="(fare, index) in flight.fares"
      :key="index"
      class="md:w-1/4 p-3 text-center"
      :class="{
        'md:bg-[#F2F2F2]': index % 2,
        'pointer-events-none grayscale opacity-50': disabled,
      }"
      @click="onBundleClick({ ...flight, selectedFare: fare })"
    >
      <div
        class="text-center text-xs font-semibold uppercase pb-1"
        :class="{ 'md:hidden': !displayBundle }"
      >
        {{ fare.bundle }}
      </div>
      <div
        class="cursor-pointer border-lipstick border-2 inline-block p-2 font-bold hover:text-white hover:bg-lipstick focus:text-white focus:bg-lipstick"
        :class="{
          'text-white bg-lipstick': isSelected({
            ...flight,
            selectedFare: fare,
          }),
        }"
      >
        {{ fare.price.currencyCode }} {{ formatPrice(fare.price.amount) }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import type { CartItem } from "~/types";
import moment from "moment";
import { useStationsStore } from "~/stores/stations";

const stationsStore = useStationsStore();
const { getStationByIata } = stationsStore;

const props = defineProps({
  flight: {
    type: Object as PropType<CartItem | undefined>,
    required: true,
  },
});
</script>

<template>
  <div v-if="flight" class="flex">
    <div class="w-1/4 p-2">
      <div class="border-2 border-[#E1E1E1] text-center font-bold rounded-md">
        <div class="bg-[#F2F2F2] py-1">
          {{ moment(flight.departureDateTime).format("MMM") }}
        </div>
        <div class="py-1">
          {{ moment(flight.departureDateTime).format("DD") }}
        </div>
      </div>
    </div>
    <div class="w-3/4 p-2 font-bold">
      <div>{{ getStationByIata(flight.departureStation)?.shortName }} -</div>
      <div>
        {{ getStationByIata(flight.arrivalStation)?.shortName }}
      </div>
      <div class="text-sm">
        {{ moment(flight.departureDateTime).format("ddd") }}
        {{ moment(flight.departureDateTime).format("HH:MM") }} -
        {{ moment(flight.arrivalDateTime).format("HH:MM") }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

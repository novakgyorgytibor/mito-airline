<script setup lang="ts">
import { useSearchFormStore } from "~/stores/searchForm";
import MitoHeader from "~/components/common/MitoHeader.vue";
import MitoCheckoutHeader from "~/components/checkout/MitoCheckoutHeader.vue";
import { useFlightsStore } from "~/stores/flights";
import { useStationsStore } from "~/stores/stations";

const flightsStore = useFlightsStore();
const { fetchFlights } = flightsStore;

const stationsStore = useStationsStore();
const { fetchStations } = stationsStore;

const searchFormStore = useSearchFormStore();
const { fetchSearchFormData } = searchFormStore;

onMounted(async () => {
  try {
    await fetchFlights();
    await fetchStations();
    fetchSearchFormData();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <MitoHeader class="absolute top-0">
    <MitoCheckoutHeader />
  </MitoHeader>
</template>

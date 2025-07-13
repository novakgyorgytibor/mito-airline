<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFlightsStore } from "~/stores/flights";
import { useStationsStore } from "~/stores/stations";

const flightsStore = useFlightsStore();
const { fetchFlights } = flightsStore;
const { flights } = storeToRefs(flightsStore);

const stationsStore = useStationsStore();
const { fetchStations } = stationsStore;
const { stations } = storeToRefs(stationsStore);

onMounted(() => {
  try {
    fetchFlights();
    fetchStations();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div>
    Mito Airline <NuxtLink to="/select-flight">Search</NuxtLink>
    <div class="bg-">
      {{ flights[0] }}
    </div>
    {{ stations[0] }}
    Szia Orsi!
  </div>
</template>

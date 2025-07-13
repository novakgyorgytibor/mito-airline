<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFlightsStore } from "~/stores/flights";
import { useStationsStore } from "~/stores/stations";
import MitoSpring from "~/components/common/MitoSpring.vue";

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
  <MitoSpring size="lg">
    Mito Airline <NuxtLink to="/select-flight">Search</NuxtLink>
    <div class="bg-">
      {{ flights[0] }}
    </div>
    {{ stations[0] }}
    <b>Szia Orsi!</b>
    <ClientOnly>
      <Vueform>
        <TextElement name="hello_world" label="Hello" placeholder="World" />
      </Vueform>
    </ClientOnly>
  </MitoSpring>
</template>

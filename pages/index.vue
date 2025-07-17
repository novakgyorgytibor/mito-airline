<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFlightsStore } from "~/stores/flights";
import { useStationsStore } from "~/stores/stations";
import { useCheckoutStore } from "~/stores/checkout";
import MitoSpring from "~/components/common/MitoSpring.vue";
import MitoCard from "~/components/common/MitoCard.vue";
import MitoSearchForm from "~/components/search/MitoSearchForm.vue";

const flightsStore = useFlightsStore();
const { fetchFlights } = flightsStore;
const { flights } = storeToRefs(flightsStore);

const stationsStore = useStationsStore();
const { fetchStations } = stationsStore;
const { stations } = storeToRefs(stationsStore);

const checkoutStore = useCheckoutStore();
const { resetCheckoutData } = checkoutStore;

onMounted(async () => {
  try {
    await fetchFlights();
    await fetchStations();
    resetCheckoutData();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="py-4 bg-secondary h-[100vh]">
    <MitoSpring size="md">
      <MitoCard>
        <template #header>MITO AIRLINE</template>
        <template #content>
          <div class="p-6">
            <MitoSearchForm />
          </div>
        </template>
      </MitoCard>
    </MitoSpring>
  </div>
</template>

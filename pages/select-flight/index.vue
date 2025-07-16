<script setup lang="ts">
import { useSearchFormStore } from "~/stores/searchForm";
import MitoHeader from "~/components/common/MitoHeader.vue";
import MitoCheckoutHeader from "~/components/checkout/MitoCheckoutHeader.vue";
import { useFlightsStore } from "~/stores/flights";
import { useStationsStore } from "~/stores/stations";
import MitoSelectFlight from "~/components/checkout/MitoSelectFlight.vue";
import { storeToRefs } from "pinia";

const flightsStore = useFlightsStore();
const { fetchFlights } = flightsStore;

const stationsStore = useStationsStore();
const { fetchStations } = stationsStore;

const searchFormStore = useSearchFormStore();
const { fetchSearchFormData } = searchFormStore;
const { searchFormData } = storeToRefs(searchFormStore);

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
  <div class="pt-18">
    <MitoHeader class="fixed top-0">
      <MitoCheckoutHeader />
    </MitoHeader>
    <div class="flex justify-center py-4 bg-secondary mb-12">
      <div>
        <MitoSelectFlight
          title="INBOUND"
          :date="searchFormData.inboundDate"
          :origin="searchFormData.origin"
          :destination="searchFormData.destination"
        ></MitoSelectFlight>
        <MitoSelectFlight
          title="OUTBOUND"
          :date="searchFormData.inboundDate"
          :origin="searchFormData.destination"
          :destination="searchFormData.origin"
        ></MitoSelectFlight>
      </div>
    </div>
  </div>
</template>

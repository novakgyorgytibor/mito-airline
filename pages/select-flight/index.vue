<script setup lang="ts">
import { useSearchFormStore } from "~/stores/searchForm";
import MitoHeader from "~/components/common/MitoHeader.vue";
import MitoCheckoutHeader from "~/components/checkout/MitoCheckoutHeader.vue";
import { useFlightsStore } from "~/stores/flights";
import { useStationsStore } from "~/stores/stations";
import { useCheckoutStore } from "~/stores/checkout";
import MitoSelectFlight from "~/components/checkout/MitoSelectFlight.vue";
import { storeToRefs } from "pinia";
import MitoCheckoutSummary from "~/components/checkout/MitoCheckoutSummary.vue";

const flightsStore = useFlightsStore();
const { fetchFlights } = flightsStore;

const stationsStore = useStationsStore();
const { fetchStations } = stationsStore;

const checkoutStore = useCheckoutStore();
const { setSelectedInbound, setSelectedOutbound } = checkoutStore;
const { selectedInbound, selectedOutbound } = storeToRefs(checkoutStore);

const searchFormStore = useSearchFormStore();
const { fetchSearchFormData } = searchFormStore;
const { searchFormData } = storeToRefs(searchFormStore);

onMounted(async () => {
  try {
    await fetchFlights();
    await fetchStations();
    fetchSearchFormData();

    if (!searchFormData.value?.origin || !searchFormData.value?.destination) {
      navigateTo("/");
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="pt-18">
    <MitoHeader class="fixed top-0" route="/">
      <MitoCheckoutHeader />
    </MitoHeader>
    <div
      class="flex items-center justify-center pt-4 md:pt-8 md:text-3xl text-navy-blue"
    >
      <img
        src="/assets/mito-airplane.svg"
        alt="airplane"
        class="inline-block pr-4"
      />
      {{ $t("mito.checkout.title") }}
    </div>
    <div
      class="flex flex-col-reverse md:flex-row justify-center py-4 px-4 bg-secondary mb-12"
    >
      <div class="p-3">
        <MitoCheckoutSummary />
      </div>
      <div class="p-3">
        <MitoSelectFlight
          :title="$t('mito.checkout.select_flight.outbound')"
          :date="searchFormData.outboundDate"
          :origin="searchFormData.origin"
          :destination="searchFormData.destination"
          :selected-flight="selectedOutbound"
          @update:selected-flight="setSelectedOutbound"
        ></MitoSelectFlight>
        <MitoSelectFlight
          :title="$t('mito.checkout.select_flight.inbound')"
          :date="searchFormData.inboundDate"
          :origin="searchFormData.destination"
          :destination="searchFormData.origin"
          :selected-flight="selectedInbound"
          :min-date="selectedOutbound?.arrivalDateTime"
          :min-searchable-date="searchFormData.outboundDate"
          @update:selected-flight="setSelectedInbound"
        ></MitoSelectFlight>
      </div>
    </div>
  </div>
</template>

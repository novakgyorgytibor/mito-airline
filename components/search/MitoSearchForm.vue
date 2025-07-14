<script setup lang="ts">
const { $api } = useNuxtApp();

import type { Station, SearchFormData } from "~/types";

import { storeToRefs } from "pinia";
import { useStationsStore } from "~/stores/stations";
import { useCheckoutStore } from "~/stores/checkout";

const stationsStore = useStationsStore();
const { fetchStations } = stationsStore;
const { stations } = storeToRefs(stationsStore);

const checkoutStore = useCheckoutStore();
const { setSearchFormData } = checkoutStore;

interface SelectOption {
  value: string;
  label: string;
  disabled: boolean;
}

const originOptions = ref<SelectOption[]>([]);
const destinationOptions = ref<SelectOption[]>([]);
const minOutboundDate = ref<string>("");

function setOriginOptions(stations: Station[]) {
  originOptions.value = stations.map((station) => {
    return {
      value: station.iata,
      label: station.shortName,
      disabled: false,
    };
  }) as SelectOption[];
}

async function fetchDestinationOptions(station: string) {
  try {
    let availableDestinations: Station[] = (await $api.get(
      "/available-destinations",
      { origin: station },
    )) as Station[];
    destinationOptions.value = availableDestinations.map((station) => {
      return {
        value: station.iata,
        label: station.shortName,
        disabled: false,
      };
    }) as SelectOption[];
  } catch (error) {
    console.error(error);
  }
}

const formData = ref<SearchFormData>({
  origin: "",
  destination: "",
  inboundDate: "",
  outboundDate: "",
});

function originChanged(station: string) {
  if (station) {
    fetchDestinationOptions(station);
  } else {
    destinationOptions.value = [];
  }
}

function inboundDateChanged(date: string) {
  minOutboundDate.value = date;
}

function onSubmit(_: FormData, form$: Iterable<any>) {
  formData.value = Object.fromEntries(form$) as SearchFormData;
  setSearchFormData(formData.value);
  navigateTo("/select-flight");
}

onMounted(async () => {
  try {
    await fetchStations();
    setOriginOptions(stations.value);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <ClientOnly>
    <Vueform class="w-full sm:min-w-sm" :endpoint="false" @submit="onSubmit">
      <SelectElement
        name="origin"
        placeholder="Origin"
        floating="Origin"
        :native="false"
        :items="originOptions"
        search
        :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
        :rules="['required']"
        @change="originChanged"
      />
      <SelectElement
        name="destination"
        placeholder="Destination"
        floating="Destination"
        :native="false"
        :items="destinationOptions"
        search
        :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
        :rules="['required']"
      />
      <DateElement
        name="inboundDate"
        floating="Departure"
        placeholder="Departure"
        :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
        :rules="['required']"
        @change="inboundDateChanged"
      />
      <DateElement
        name="outboundDate"
        floating="Return"
        placeholder="Return"
        :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
        :min="minOutboundDate"
      />
      <ButtonElement
        submits
        name="submit"
        class="mx-auto"
        button-class="font-semibold min-w-[230px]"
        >Search</ButtonElement
      >
    </Vueform>
  </ClientOnly>
</template>

<style>
:root,
:before,
:after,
* {
  --vf-primary: #3434e0;
  --vf-primary-darker: #3434e0;
  --vf-danger: #c6007e;
}
</style>

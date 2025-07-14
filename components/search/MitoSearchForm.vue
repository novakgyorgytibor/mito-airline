<script setup lang="ts">
const { $api } = useNuxtApp();

import type { Station } from "~/types";

import { storeToRefs } from "pinia";
import { useStationsStore } from "~/stores/stations";

const stationsStore = useStationsStore();
const { fetchStations } = stationsStore;
const { stations } = storeToRefs(stationsStore);

interface SearchFormData {
  origin: string;
  destination: string;
  inboundDate: string;
  outboundDate: string;
}
interface SelectOption {
  value: string;
  label: string;
  disabled: boolean;
}

const originOptions = ref<SelectOption[]>([]);
const destinationOptions = ref<SelectOption[]>([]);

function setOriginOptions(stations: Station[]) {
  originOptions.value = stations.map((station) => {
    return {
      value: station.iata,
      label: station.shortName,
      disabled: false,
    };
  }) as SelectOption[];
}

async function setDestinationOptions(station: string) {
  let availableDestinations: Station[] = (await $api.get(
    "/available-destinations",
    { origin: station },
  )) as Station[];

  console.log(availableDestinations);

  destinationOptions.value = availableDestinations.map((station) => {
    return {
      value: station.iata,
      label: station.shortName,
      disabled: false,
    };
  }) as SelectOption[];
}

onMounted(async () => {
  try {
    await fetchStations();
    setOriginOptions(stations.value);
  } catch (error) {
    console.error(error);
  }
});

const formData = ref<SearchFormData>({
  origin: "",
  destination: "",
  inboundDate: "",
  outboundDate: "",
});

function originSelected(station: string) {
  setDestinationOptions(station);
}

function onSubmit(_: FormData, form$: Iterable<any>) {
  formData.value = Object.fromEntries(form$) as SearchFormData;
}
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
        @select="originSelected"
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
        floating="Date"
        :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
        :rules="['required']"
      />
      <DateElement
        name="outboundDate"
        floating="Date"
        :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
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

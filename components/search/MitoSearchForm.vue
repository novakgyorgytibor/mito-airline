<script setup lang="ts">
import moment from "moment";

const { $api } = useNuxtApp();

import type { Station, SearchFormData } from "~/types";

import { storeToRefs } from "pinia";
import { useStationsStore } from "~/stores/stations";
import { useSearchFormStore } from "~/stores/searchForm";

const stationsStore = useStationsStore();
const { fetchStations } = stationsStore;
const { stations } = storeToRefs(stationsStore);

const searchFormStore = useSearchFormStore();
const { searchFormData } = storeToRefs(searchFormStore);
const { setSearchFormData, fetchSearchFormData } = searchFormStore;

interface SelectOption {
  value: string;
  label: string;
  disabled: boolean;
}

const originOptions = ref<SelectOption[]>([]);
const destinationOptions = ref<SelectOption[]>([]);
const minInboundDate = ref<string>("");
const minOutboundDate = ref<string>(moment(new Date()).format("YYYY-MM-DD"));

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

function outboundDateChanged(date: string) {
  minInboundDate.value = date;
}

function onChange(form$: SearchFormData) {
  formData.value = form$ as SearchFormData;
  setSearchFormData(formData.value);
}

function onSubmit(_: FormData, form$: Iterable<any>) {
  formData.value = Object.fromEntries(form$) as SearchFormData;
  setSearchFormData(formData.value);
  navigateTo("/select-flight");
}

onMounted(async () => {
  try {
    fetchSearchFormData();
    await fetchStations();
    setOriginOptions(stations.value);
    if (searchFormData.value.origin) {
      await fetchDestinationOptions(searchFormData.value.origin);
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <ClientOnly>
    <Vueform
      class="w-full sm:min-w-sm"
      :endpoint="false"
      :default="searchFormData"
      @change="onChange"
      @submit="onSubmit"
    >
      <SelectElement
        name="origin"
        :placeholder="$t('mito.search_form.origin.label')"
        :floating="$t('mito.search_form.origin.label')"
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
        :placeholder="$t('mito.search_form.destination.label')"
        :floating="$t('mito.search_form.destination.label')"
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
        name="outboundDate"
        :floating="$t('mito.search_form.inbound_date.label')"
        :placeholder="$t('mito.search_form.inbound_date.label')"
        :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
        :rules="['required']"
        :min="minOutboundDate"
        @change="outboundDateChanged"
      />
      <DateElement
        name="inboundDate"
        :floating="$t('mito.search_form.outbound_date.label')"
        :placeholder="$t('mito.search_form.outbound_date.label')"
        :columns="{
          container: 6,
          label: 12,
          wrapper: 12,
        }"
        :min="minInboundDate"
      />
      <ButtonElement
        submits
        name="submit"
        class="mx-auto"
        button-class="font-semibold min-w-[230px]"
        >{{ $t("mito.search_form.submit") }}</ButtonElement
      >
    </Vueform>
  </ClientOnly>
</template>

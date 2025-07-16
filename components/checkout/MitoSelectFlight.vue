<script setup lang="ts">
import type { Station, Flight } from "~/types";
import MitoCard from "~/components/common/MitoCard.vue";
import MitoDateSelector from "~/components/checkout/MitoDateSelector.vue";
const { $api } = useNuxtApp();

const selectedOrigin = ref<Station>({
  iata: "",
  shortName: "",
  connections: [],
});

const selectedDestination = ref<Station>({
  iata: "",
  shortName: "",
  connections: [],
});

const availableFlights = ref<Flight[]>([]);

const selectedDate = ref<string>("");

const props = defineProps({
  title: {
    type: String,
    default: "Flight",
  },
  origin: {
    type: String,
    default: "",
  },
  destination: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    required: true,
  },
});

async function fetchAvailableFlights(date: string) {
  if (date && props.origin && props.destination) {
    availableFlights.value = (await $api.get("/available-flights", {
      date: selectedDate.value,
      origin: props.origin,
      destination: props.destination,
    })) as Flight[];
  }
}

async function fetchOrigin() {
  try {
    if (props.origin) {
      selectedOrigin.value = (await $api.get("/stations", {
        iata: props.origin,
      })) as Station;
    }
  } catch (error) {
    console.error(error);
  }
}
async function fetchDestination() {
  try {
    if (props.destination) {
      selectedDestination.value = (await $api.get("/stations", {
        iata: props.destination,
      })) as Station;
    }
    await fetchAvailableFlights(props.date);
  } catch (error) {
    console.error(error);
  }
}

async function onSelectedDateUpdated(date: string) {
  selectedDate.value = date;
  await fetchAvailableFlights(date);
}

onMounted(async () => {
  selectedDate.value = props.date;
  await fetchOrigin();
  await fetchDestination();

  watch(
    () => props.origin,
    () => {
      fetchOrigin();
    },
  );

  watch(
    () => props.destination,
    () => {
      fetchDestination();
    },
  );

  watch(
    () => props.date,
    () => {
      selectedDate.value = props.date;
    },
  );
});
</script>

<template>
  <MitoCard :display-header="false" class="max-w-lg md:w-lg mt-4">
    <template #custom-header>
      <div class="flex items-center bg-[#F2F2F2] p-4">
        <div class="hidden md:block text-[#919191]">{{ title }}</div>
        <div
          class="flex items-center text-xl text-navy-blue font-semibold md:pl-12 pl-2"
        >
          <div>
            {{ selectedOrigin?.shortName }}
          </div>
          <Icon name="ci:arrow-right-lg" class="px-4"></Icon>
          <div>
            {{ selectedDestination?.shortName }}
          </div>
        </div>
      </div>
      <MitoDateSelector
        v-if="selectedDate"
        :date="selectedDate"
        @update:selected-date="onSelectedDateUpdated"
      />
    </template>
    <template v-if="availableFlights.length" #content>
      <div v-for="(flight, index) in availableFlights" :key="index">
        {{ flight }}
      </div>
    </template>
    <template v-else #content>
      <div class="text-lipstick font-semibold text-center uppercase">
        No flights found, sorry!
      </div></template
    >
  </MitoCard>
</template>

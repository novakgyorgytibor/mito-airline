import { defineStore } from "pinia";
import type { Flight } from "~/types";

export const useFlightsStore = defineStore("flightsStore", () => {
  const { $api } = useNuxtApp();
  const flights = ref<Flight[]>([]);

  async function fetchFlights() {
    flights.value = (await $api.get("/flights")) as Flight[];
  }

  return {
    flights,
    fetchFlights,
  };
});

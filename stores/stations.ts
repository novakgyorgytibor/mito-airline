import { defineStore } from "pinia";
import type { Station } from "~/types";

export const useStationsStore = defineStore("stationsStore", () => {
  const { $api } = useNuxtApp();
  const stations = ref<Station[]>([]);

  async function fetchStations() {
    stations.value = (await $api.get("/stations")) as Station[];
  }

  function getStationByIata(iata: string) {
    return stations.value.find((station) => station.iata === iata);
  }

  return {
    stations,
    fetchStations,
    getStationByIata,
  };
});

import { defineStore } from "pinia";
import type { Station } from "~/types";

export const useStationsStore = defineStore("stationsStore", () => {
  const { $api } = useNuxtApp();
  const stations = ref<Station[]>([]);

  async function fetchStations(): Promise<void> {
    stations.value = (await $api.get("/stations")) as Station[];
  }

  return {
    stations,
    fetchStations,
  };
});

import { defineStore } from "pinia";
import type { SearchFormData } from "~/types";

export const useSearchFormStore = defineStore("searchFormStore", () => {
  const { $api } = useNuxtApp();
  const searchFormData = ref<SearchFormData>({
    origin: "",
    destination: "",
    inboundDate: "",
    outboundDate: "",
  });

  function fetchSearchFormData() {
    const data = localStorage.getItem("searchFormData");

    if (data) {
      searchFormData.value = JSON.parse(data) as SearchFormData;
    }
  }

  function saveSearchFormData(data: SearchFormData) {
    localStorage.setItem("searchFormData", JSON.stringify(data));
  }

  function setSearchFormData(data: SearchFormData) {
    searchFormData.value = data;
    saveSearchFormData(data);
  }

  function resetSearchFormData() {
    setSearchFormData({
      origin: "",
      destination: "",
      inboundDate: "",
      outboundDate: "",
    });
  }

  return {
    searchFormData,
    setSearchFormData,
    fetchSearchFormData,
    resetSearchFormData,
  };
});

import { defineStore } from "pinia";
import type { SearchFormData } from "~/types";

export const useCheckoutStore = defineStore("checkoutStore", () => {
  const { $api } = useNuxtApp();
  const searchFormData = ref<SearchFormData>({
    origin: "",
    destination: "",
    inboundDate: "",
    outboundDate: "",
  });

  async function setSearchFormData(data: SearchFormData): Promise<void> {
    searchFormData.value = data;
  }

  return {
    searchFormData,
    setSearchFormData,
  };
});

import moment from "moment";
import { defineStore } from "pinia";
import type { CartItem } from "~/types";
import { computed } from "vue";

export const useCheckoutStore = defineStore("checkoutStore", () => {
  const selectedInbound = ref<CartItem>();
  const selectedOutbound = ref<CartItem>();

  function setSelectedInbound(inboundItem: CartItem | undefined) {
    selectedInbound.value = inboundItem;
    validateInbound();
  }
  function setSelectedOutbound(outboundItem: CartItem | undefined) {
    selectedOutbound.value = outboundItem;
    validateInbound();
  }

  function validateInbound() {
    console.log("belefut/e ebbe");
    console.log(selectedInbound.value?.departureDateTime);
    console.log(selectedOutbound.value?.arrivalDateTime);
    console.log(moment(selectedInbound.value?.departureDateTime));
    console.log(moment(selectedOutbound.value?.arrivalDateTime));
    if (
      moment(selectedInbound.value?.departureDateTime).isBefore(
        moment(selectedOutbound.value?.arrivalDateTime),
      )
    ) {
      selectedInbound.value = undefined;
    }
  }

  const totalPrice = computed(() => {
    const outboundPrice =
      selectedOutbound.value?.selectedFare?.price?.amount || 0;
    const inboundPrice =
      selectedInbound.value?.selectedFare?.price?.amount || 0;

    return outboundPrice + inboundPrice;
  });

  const currency = computed(() => {
    return selectedOutbound.value?.selectedFare?.price?.currencyCode;
  });

  function resetCheckoutData() {
    selectedOutbound.value = undefined;
    selectedInbound.value = undefined;
  }

  return {
    selectedInbound,
    selectedOutbound,
    setSelectedInbound,
    setSelectedOutbound,
    totalPrice,
    currency,
    resetCheckoutData,
  };
});

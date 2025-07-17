import moment from "moment";
import { defineStore } from "pinia";
import type { CartItem } from "~/types";
import { computed } from "vue";

export const useCheckoutStore = defineStore("checkoutStore", () => {
  const selectedInbound = ref<CartItem>();
  const selectedOutbound = ref<CartItem>();

  async function setSelectedInbound(inboundItem: CartItem | undefined) {
    selectedInbound.value = inboundItem;
  }
  async function setSelectedOutbound(outboundItem: CartItem | undefined) {
    selectedOutbound.value = outboundItem;
    validateInbound();
  }

  function validateInbound() {
    if (
      moment(selectedInbound.value?.arrivalDateTime).isBefore(
        moment(selectedOutbound.value?.departureDateTime),
      )
    ) {
      selectedInbound.value = undefined;
    }
  }

  const totalPrice = computed(() => {
    const outboundPrice =
      selectedOutbound.value?.selectedFare?.price?.amount || 0;
    const inboundPrice =
      selectedOutbound.value?.selectedFare?.price?.amount || 0;

    return outboundPrice + inboundPrice;
  });

  const currency = computed(() => {
    return selectedOutbound.value?.selectedFare?.price?.currencyCode;
  });

  return {
    selectedInbound,
    selectedOutbound,
    setSelectedInbound,
    setSelectedOutbound,
    totalPrice,
    currency,
  };
});

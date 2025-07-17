import moment from "moment";
import { defineStore } from "pinia";
import type { CartItem } from "~/types";

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

  return {
    selectedInbound,
    selectedOutbound,
    setSelectedInbound,
    setSelectedOutbound,
  };
});

import { defineStore } from "pinia";
import type { CartItem } from "~/types";

export const useCheckoutStore = defineStore("checkoutStore", () => {
  const selectedInbound = ref<CartItem>();
  const selectedOutbound = ref<CartItem>();

  async function setSelectedInbound(inboundItem: CartItem) {
    selectedInbound.value = inboundItem;
  }
  async function setSelectedOutbound(outboundItem: CartItem) {
    selectedOutbound.value = outboundItem;
  }

  return {
    selectedInbound,
    selectedOutbound,
    setSelectedInbound,
    setSelectedOutbound,
  };
});

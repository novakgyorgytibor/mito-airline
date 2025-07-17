<script setup lang="ts">
import MitoCard from "~/components/common/MitoCard.vue";
import MitoCheckoutSummaryItem from "~/components/checkout/MitoCheckoutSummaryItem.vue";
import MitoModal from "~/components/common/MitoModal.vue";
import MitoPaymentModalContent from "~/components/checkout/MitoPaymentModalContent.vue";

import { useCheckoutStore } from "~/stores/checkout";
import { useSearchFormStore } from "~/stores/searchForm";
import { storeToRefs } from "pinia";
import { formatPrice } from "~/utils";

const checkoutStore = useCheckoutStore();
const { selectedInbound, selectedOutbound, totalPrice, currency } =
  storeToRefs(checkoutStore);
const { resetCheckoutData } = checkoutStore;

const searchFormStore = useSearchFormStore();
const { resetSearchFormData } = searchFormStore;

const isPaymentModalOpen = ref<boolean>(false);

function startPayment() {
  isPaymentModalOpen.value = true;
}

function reset(clearOrder: Boolean) {
  isPaymentModalOpen.value = false;
  if (clearOrder) {
    resetCheckoutData();
    resetSearchFormData();
    navigateTo("/");
  }
}
</script>

<template>
  <MitoCard
    :display-header="false"
    class="h-fit min-w-[16rem] mt-4 border-t-[#C1C1C1] border-t-2"
  >
    <template #content>
      <div class="flex justify-between p-3 font-semibold text-sm">
        <div>CART</div>
        <div class="text-navy-blue">
          {{ currency || "HUF" }} {{ formatPrice(totalPrice) }}
        </div>
      </div>
      <div v-if="!totalPrice" class="text-[#919191] p-4 font-semibold">
        Choose an outbound flight
      </div>
      <MitoCheckoutSummaryItem
        v-if="selectedOutbound"
        :flight="selectedOutbound"
      />
      <MitoCheckoutSummaryItem
        v-if="selectedOutbound"
        :flight="selectedInbound"
      />
      <div
        class="flex justify-between p-3 font-semibold text-sm text-white bg-navy-blue mt-2"
      >
        <div>TOTAL</div>
        <div>{{ currency || "HUF" }} {{ formatPrice(totalPrice) }}</div>
      </div>
    </template>
  </MitoCard>
  <button
    v-if="totalPrice"
    class="w-full bg-lipstick text-white font-bold py-2 px-4 rounded mt-2 hover:scale-105 transition delay-150 duration-300"
    @click="startPayment"
  >
    Pay now!
  </button>
  <MitoModal :is-open="isPaymentModalOpen">
    <MitoPaymentModalContent @reset="reset" />
  </MitoModal>
</template>

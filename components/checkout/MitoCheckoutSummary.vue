<script setup lang="ts">
import MitoCard from "~/components/common/MitoCard.vue";

import { useCheckoutStore } from "~/stores/checkout";
import { storeToRefs } from "pinia";
import { formatPrice } from "~/utils";
import MitoCheckoutSummaryItem from "~/components/checkout/MitoCheckoutSummaryItem.vue";

const checkoutStore = useCheckoutStore();
const { selectedInbound, selectedOutbound, totalPrice, currency } =
  storeToRefs(checkoutStore);
</script>

<template>
  <MitoCard :display-header="false" class="h-fit min-w-[16rem] mt-4">
    <template #content>
      <div class="flex justify-between p-3 font-semibold text-sm">
        <div>CART</div>
        <div v-if="totalPrice" class="text-navy-blue">
          {{ currency }} {{ formatPrice(totalPrice) }}
        </div>
      </div>
      <div v-if="!totalPrice" class="text-lipstick uppercase p-4 font-semibold">
        Select flights!
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
        v-if="totalPrice"
        class="flex justify-between p-3 font-semibold text-sm text-white bg-navy-blue mt-2"
      >
        <div>TOTAL</div>
        <div>{{ currency }} {{ formatPrice(totalPrice) }}</div>
      </div>
    </template>
  </MitoCard>
  <button
    v-if="totalPrice"
    class="w-full bg-lipstick text-white font-bold py-2 px-4 rounded mt-2 hover:scale-105 transition delay-150 duration-300"
  >
    Pay now!
  </button>
</template>

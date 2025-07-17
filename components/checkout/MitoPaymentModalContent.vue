<script setup lang="ts">
import MitoCard from "~/components/common/MitoCard.vue";

const emits = defineEmits<{
  (e: "reset", payload: boolean): void;
}>();

import { useCheckoutStore } from "~/stores/checkout";
import { storeToRefs } from "pinia";
import { formatPrice } from "~/utils";
import MitoCheckoutSummaryItem from "~/components/checkout/MitoCheckoutSummaryItem.vue";

const checkoutStore = useCheckoutStore();
const { selectedInbound, selectedOutbound, totalPrice, currency } =
  storeToRefs(checkoutStore);

function reset() {
  emits("reset", true);
}
</script>

<template>
  <MitoCard :display-header="false" class="h-fit min-w-[16rem] mt-4">
    <template #custom-header>
      <div class="bg-[#F2F2F2] p-4">
        <div class="hidden md:block text-navy-blue uppercase">
          {{ $t("mito.checkout.modal.title") }}
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex flex-wrap justify-between p-3 font-semibold text-sm">
        <MitoCheckoutSummaryItem
          v-if="selectedOutbound"
          :flight="selectedOutbound"
          class="w-full md:w-1/2"
        />
        <MitoCheckoutSummaryItem
          v-if="selectedOutbound"
          :flight="selectedInbound"
          class="w-full md:w-1/2"
        />
      </div>
      <div
        v-if="totalPrice"
        class="flex justify-between p-3 font-semibold text-sm mt-2 mx-2"
      >
        <div>
          {{ $t("mito.checkout.modal.total") }}
          <span class="text-navy-blue"
            >{{ currency }} {{ formatPrice(totalPrice) }}</span
          >
        </div>
        <div
          @click="reset"
          class="text-lipstick uppercase underline cursor-pointer"
        >
          {{ $t("mito.checkout.modal.reset") }}
        </div>
      </div>
    </template>
  </MitoCard>
</template>

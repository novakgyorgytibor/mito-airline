<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchFormStore } from "~/stores/searchForm";
import { useStationsStore } from "~/stores/stations";

const searchFormStore = useSearchFormStore();
const { searchFormData } = storeToRefs(searchFormStore);

const stationsStore = useStationsStore();
const { getStationByIata } = stationsStore;

const originShortName = ref<string>("");
const destinationShortName = ref<string>("");

onMounted(() => {
  watch(
    () => searchFormData.value,
    () => {
      originShortName.value =
        getStationByIata(searchFormData.value.origin)?.shortName || "";
      destinationShortName.value =
        getStationByIata(searchFormData.value.destination)?.shortName || "";
    },
  );
});
</script>

<template>
  <div
    v-if="originShortName && destinationShortName"
    class="relative flex items-center md:text-2xl pt-4"
  >
    <div class="px-2">
      <div class="absolute text-xs bottom-8">
        {{ $t("mito.checkout.header.label") }}
      </div>
      {{ originShortName }}
    </div>
    <Icon name="ci:arrow-left-right" class="px-2"></Icon>
    <div class="px-2">
      {{ destinationShortName }}
    </div>
  </div>
</template>

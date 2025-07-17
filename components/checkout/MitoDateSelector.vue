<script setup lang="ts">
import moment from "moment";

const emits = defineEmits<{
  (e: "update:selectedDate", payload: string): void;
}>();

const minSelectableDay = ref<string>(moment(new Date()).format("YYYY-MM-DD"));

const props = defineProps({
  date: {
    type: String,
    default: 0,
  },
});

const previousDay = computed(() => {
  return moment(props.date).add(-1, "days");
});

const selectedDay = computed(() => {
  return moment(props.date);
});

const nextDay = computed(() => {
  return moment(props.date).add(1, "days");
});
</script>

<template>
  <div class="flex justify-between items-center p-4">
    <div
      class="cursor-pointer"
      :class="{
        'grayscale opacity-30 !cursor-not-allowed':
          previousDay.isBefore(minSelectableDay),
      }"
      @click="
        () => {
          if (previousDay.isBefore(minSelectableDay)) return;
          emits('update:selectedDate', previousDay.format('YYYY-MM-DD'));
        }
      "
    >
      <Icon
        name="ci:chevron-left"
        class="text-lipstick translate-y-[3px]"
        :class="{
          '!text-[#919191]': previousDay.isBefore(minSelectableDay),
        }"
      ></Icon>
      <span
        class="hidden md:inline text-[#919191] text-sm uppercase font-semibold"
      >
        {{ previousDay.format("ddd, YYYY.MM.DD.") }}
      </span>
    </div>
    <div>{{ selectedDay.format("dddd, YYYY.MM.DD.") }}</div>
    <div
      class="cursor-pointer"
      @click="emits('update:selectedDate', nextDay.format('YYYY-MM-DD'))"
    >
      <span
        class="hidden md:inline text-[#919191] text-sm uppercase font-semibold"
      >
        {{ nextDay.format("ddd, YYYY.MM.DD.") }}
      </span>
      <Icon
        name="ci:chevron-right"
        class="text-lipstick translate-y-[3px]"
      ></Icon>
    </div>
  </div>
</template>

<style scoped></style>

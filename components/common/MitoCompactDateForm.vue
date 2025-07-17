<script setup lang="ts">
import moment from "moment";

const emits = defineEmits<{
  (e: "update:date", payload: string): void;
}>();

const props = defineProps({
  minDate: {
    type: String,
    default: undefined,
  },
});

function onSubmit(_: FormData, form$: Iterable<any>) {
  emits("update:date", Object.fromEntries(form$).date);
}
</script>

<template>
  <div>
    <ClientOnly>
      <Vueform :endpoint="false" @submit="onSubmit" class="w-[230px] m-auto">
        <DateElement
          name="date"
          floating="Date"
          placeholder="Date"
          :min="minDate"
        />
        <ButtonElement
          submits
          name="submit"
          class="mx-auto"
          button-class="w-[230px] font-semibold translate-y-[-8px]"
          :rules="['required']"
          >Search</ButtonElement
        >
      </Vueform>
    </ClientOnly>
  </div>
</template>

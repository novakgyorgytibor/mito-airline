<script setup lang="ts">
import moment from "moment/moment";

const emits = defineEmits<{
  (e: "update:date", payload: string): void;
}>();

const minDate = ref<string>(moment(new Date()).format("YYYY-MM-DD"));

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
          :floating="$t('mito.compact_date_form.label')"
          :placeholder="$t('mito.compact_date_form.label')"
          :min="minDate"
        />
        <ButtonElement
          submits
          name="submit"
          class="mx-auto"
          button-class="w-[230px] font-semibold translate-y-[-8px]"
          :rules="['required']"
          >{{ $t("mito.compact_date_form.submit") }}</ButtonElement
        >
      </Vueform>
    </ClientOnly>
  </div>
</template>

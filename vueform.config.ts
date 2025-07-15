// @ts-ignore
import en from "@vueform/vueform/locales/en";
// @ts-ignore
import tailwind from "@vueform/vueform/dist/tailwind";
// @ts-ignore
import { defineConfig } from "@vueform/vueform";

export default defineConfig({
  theme: tailwind,
  locales: { en },
  locale: "en",
});

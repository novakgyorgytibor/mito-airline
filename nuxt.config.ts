// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueform/nuxt",
    "@nuxt/icon",
  ],
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  routeRules: {
    "/": { prerender: true },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
});

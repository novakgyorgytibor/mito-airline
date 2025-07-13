// https://nuxt.com/docs/api/configuration/nuxt-config
const getTailwindConfig = require("./config/tailwind");

export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
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
  tailwindcss: { config: getTailwindConfig() },
});

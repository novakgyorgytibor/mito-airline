// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueform/nuxt",
    "@nuxt/icon",
    "@nuxtjs/i18n",
  ],
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  routeRules: {
    "/": { prerender: true },
    /* NuxtIcon not working when /api/** used */
    "/mito-api/**": { proxy: process.env.API_BASE_URL },
  },
  i18n: {
    defaultLocale: "en",
    locales: [{ code: "en", name: "English", file: "en.json" }],
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

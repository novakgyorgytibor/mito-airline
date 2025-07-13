// https://nuxt.com/docs/api/configuration/nuxt-config
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
      apiBaseUrl: "http://localhost:8000",
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            lipstick: "#C6007E",
            "navy-blue": "#06038D",
            tutu: "#FFF2FA",
          },
        },
      },
    },
  },
});

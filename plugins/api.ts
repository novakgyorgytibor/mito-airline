export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;

  return {
    provide: {
      api: {
        async get(url: string, params: object = {}) {
          return $fetch(`${baseUrl}${url}`, {
            method: "GET",
            ...params,
          });
        },
      },
    },
  };
});

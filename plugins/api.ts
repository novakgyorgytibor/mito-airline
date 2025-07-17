export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  return {
    provide: {
      api: {
        async get(url: string, params: object = {}) {
          return $fetch(`/mito-api${url}`, {
            method: "GET",
            query: {
              ...params,
            },
          });
        },
      },
    },
  };
});

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  return {
    provide: {
      api: {
        async get(url: string, params: object = {}) {
          return $fetch(`/api${url}`, {
            method: "GET",
            query: {
              ...params,
            },
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            },
          });
        },
      },
    },
  };
});

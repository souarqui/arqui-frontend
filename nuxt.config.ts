// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@pinia/nuxt"],

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  plugins: [
    "~/plugins/http.js",
    "~/plugins/vue-tippy.js",
    "~/plugins/vform.js",
    "~/plugins/global-components.js",
  ],

  i18n: {
    locales: [{ code: "ptBR", iso: "pt-BR", file: "pt-BR.json" }],
    defaultLocale: "ptBR",
    langDir: "locales/",
    lazy: true,
    strategy: "prefix_except_default",
  },
});

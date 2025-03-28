// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  plugins: [
    "~/plugins/http.js",
    "~/plugins/pinia.js",
    "~/plugins/vue-tippy.js",
    "~/plugins/global-components.js",
  ],

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],

  i18n: {
    locales: [{ code: "ptBR", iso: "pt-BR", file: "pt-BR.json" }],
    defaultLocale: "ptBR",
    langDir: "locales/",
    lazy: true,
    strategy: "prefix_except_default",
  },
});

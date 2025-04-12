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

  app: {
    head: {
      title: "Home",
      titleTemplate: "%s - Arqui",
      meta: [],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
    },
  },

  i18n: {
    locales: [{ code: "ptBR", iso: "pt-BR", file: "pt-BR.json" }],
    defaultLocale: "ptBR",
    langDir: "locales/",
    lazy: true,
    strategy: "prefix_except_default",
  },

  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.js",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
});

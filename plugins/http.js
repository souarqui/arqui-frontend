// plugins/http.js
import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("api", (url, options = {}) => {
    return nuxtApp
      .$fetch(url, {
        baseURL: import.meta.env.VITE_PUBLIC_API_URL,
        withCredentials: true,
        headers: {
          "App-Type": "0",
          ...options.headers,
        },
        ...options,
      })
      .catch((error) => {
        const alertStore = useAlertStore();
        const i18n = nuxtApp.$i18n;

        if (!error.response) {
          alertStore.show({
            type: "critical",
            title: i18n.t("connection_error"),
            subtitle: i18n.t("please_verify_connection"),
            assistiveButton: i18n.t("back"),
            size: "large",
          });
        } else if (error.response.status === 500) {
          alertStore.show({
            type: "critical",
            title: i18n.t("internal_error"),
            subtitle: i18n.t("try_again_later"),
            assistiveButton: i18n.t("back"),
          });
        } else {
          alertStore.show({
            type: "critical",
            title: i18n.t("error_ocurried"),
            subtitle: error.data.message || i18n.t("unknown_error"),
            assistiveButton: i18n.t("back"),
          });
        }

        throw error;
      });
  });
});

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = async (url, options = {}) => {
    try {
      const response = await $fetch(url, {
        baseURL: config.public.apiUrl,
        withCredentials: true,
        headers: {
          "App-Type": "0",
          ...options.headers,
        },
        ...options,
      });
      return response;
    } catch (error) {
      handleApiError(error, nuxtApp);
      throw error;
    }
  };

  const handleApiError = (error, nuxtApp) => {
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
        subtitle: error.data?.message || i18n.t("unknown_error"),
        assistiveButton: i18n.t("back"),
      });
    }
  };

  nuxtApp.provide("api", api);
});

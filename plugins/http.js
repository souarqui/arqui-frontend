import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const globalHeaders = {
    "App-Type": "0",
    "Content-Type": "application/json",
  };

  const baseRequest = async (url, options = {}) => {
    try {
      return await $fetch(url, {
        baseURL: config.public.apiUrl,
        credentials: "include",
        headers: {
          ...globalHeaders,
          ...options.headers,
        },
        ...options,
      });
    } catch (error) {
      handleApiError(error, nuxtApp);
      throw error;
    }
  };

  const api = {
    request: {
      get: (url, options = {}) =>
        baseRequest(url, { ...options, method: "GET" }),
      post: (url, body, options = {}) =>
        baseRequest(url, { ...options, method: "POST", body }),
      put: (url, body, options = {}) =>
        baseRequest(url, { ...options, method: "PUT", body }),
      patch: (url, body, options = {}) =>
        baseRequest(url, { ...options, method: "PATCH", body }),
      delete: (url, options = {}) =>
        baseRequest(url, { ...options, method: "DELETE" }),
      custom: (url, options = {}) => baseRequest(url, options),
    },

    setHeader(name, value) {
      if (value === false) {
        delete globalHeaders[name];
      } else {
        globalHeaders[name] = value;
      }
    },

    setToken(token, type = "Bearer") {
      if (token) {
        this.setHeader("Authorization", `${type} ${token}`);
      } else {
        this.setHeader("Authorization", false);
      }
    },
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

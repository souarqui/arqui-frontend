import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUserData(user, token) {
      const { $axios } = useNuxtApp();
      this.user = user;
      this.token = token;
      localStorage.setItem("authToken", token);
      $axios.setToken(token, "Bearer");
    },

    clearUserData() {
      const { $axios } = useNuxtApp();
      this.user = null;
      this.token = null;
      localStorage.removeItem("authToken");
      $axios.setToken(false);
    },

    async fetchUser() {
      const { $axios } = useNuxtApp();
      try {
        const response = await $axios.$get("/auth/user");

        if (response) {
          this.setUserData(response, this.token);
        } else {
          this.clearUserData();
        }
      } catch (error) {
        this.clearUserData();
        console.error("Erro ao buscar o usuário:", error);
      }
    },

    async logout() {
      const { $axios } = useNuxtApp();
      try {
        await $axios.$post("/auth/logout");
        this.clearUserData();
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    },

    restoreSession() {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem("authToken");
      if (token) {
        this.token = token;
        $axios.setToken(token, "Bearer");
      }
    },
  },
});

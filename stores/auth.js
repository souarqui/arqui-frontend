import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUserData(user, token) {
      const { $api } = useNuxtApp();
      this.user = user;
      this.token = token;
      localStorage.setItem("authToken", token);
      $api.setToken(token);
    },

    clearUserData() {
      const { $api } = useNuxtApp();
      this.user = null;
      this.token = null;
      localStorage.removeItem("authToken");
      $api.setToken(null);
    },

    async fetchUser() {
      const { $api } = useNuxtApp();
      try {
        const response = await $api.request.get("/auth/user");

        if (response) {
          this.setUserData(response, this.token);
          return response;
        } else {
          this.clearUserData();
        }
      } catch (error) {
        this.clearUserData();
        console.error("Erro ao buscar o usuário:", error);
        throw error;
      }
    },

    async logout() {
      const { $api } = useNuxtApp();
      try {
        await $api.request.post("/auth/logout");
        this.clearUserData();
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    },

    async restoreSession() {
      const { $api } = useNuxtApp();
      const token = localStorage.getItem("authToken");
      if (token) {
        this.token = token;
        $api.setToken(token, "Bearer");
        await this.fetchUser();
      }
    },
  },
});

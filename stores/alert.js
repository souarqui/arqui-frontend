import { defineStore } from "pinia";

// Função para retornar o estado padrão
const getDefaultState = () => ({
  isActive: false,
  defaults: {
    root: true,
    size: "medium",
    type: null,
    mask: "default",
    variant: "brand",
    title: "",
    subtitle: "",
    optional: "",
    submitButton: "",
    assistiveButton: "",
    cancelButton: {
      text: "Não",
    },
    submitButton: {
      text: "Sim",
    },
  },
  options: {},
});

export const useAlertStore = defineStore("alert", {
  state: () => getDefaultState(),

  actions: {
    show(options) {
      return new Promise((resolve, reject) => {
        // Se for um alerta de confirmação
        /*if (options.mode === "confirm") {
          options.submitButton
            ? (options.submitButton.handler = resolve)
            : (this.defaults.submitButton.handler = resolve);
          options.cancelButton
            ? (options.cancelButton.handler = reject)
            : (this.defaults.cancelButton.handler = reject);
        } else {
          resolve(); // Para outros modos, simplesmente resolve
        }*/

        resolve();

        // Atualiza o estado com as opções fornecidas
        this.$patch({
          isActive: true,
          options: options,
        });
      });
    },

    hide() {
      return new Promise((resolve) => {
        this.isActive = false;
        setTimeout(() => {
          this.$patch(getDefaultState());
          resolve();
        }, 500);
      });
    },

    success(options) {
      return this.show({
        title: "Sucesso",
        mode: "success",
        ...options,
      });
    },

    error(options) {
      return this.show({
        title: "Erro",
        mode: "error",
        ...options,
      });
    },

    warning(options) {
      return this.show({
        title: "Atenção!",
        mode: "warning",
        ...options,
      });
    },

    confirm(options) {
      options = { mode: "confirm", titleNoBorder: false, ...options };
      return this.show(options);
    },
  },
});

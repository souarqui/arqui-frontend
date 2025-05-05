<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-40">
    <div
      class="flex w-full h-[66px] px-4 flex-col justify-center items-start gap-2.5 rounded-b-[18px] bg-white shadow-bottom-lowest"
    >
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-4">
          <button @click="toggleMenu">
            <AqIcon
              icon="hamburger-menu-retracted"
              size="large"
              color="main-default"
            />
          </button>
          <img
            src="/assets/images/logo-text-colored.png"
            alt="Arqui"
            class="w-[86px]"
          />
        </div>

        <div class="flex items-center gap-4">
          <button>
            <AqIcon icon="magnifer" size="large" color="main-light" />
          </button>
          <button>
            <AqIcon icon="chat-round" size="large" color="main-light" />
          </button>
          <div
            class="bg-surface-main-light w-10 h-10 rounded-full flex items-center justify-center caption-semibold text-default"
          >
            AR
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="isMenuOpen" class="fixed inset-0 z-50">
    <div
      class="absolute inset-0 bg-black bg-opacity-50"
      @click="toggleMenu"
    ></div>

    <transition name="slide">
      <div
        v-show="isMenuOpen"
        class="absolute left-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-right-high"
        style="border-top-right-radius: 24px; border-bottom-right-radius: 24px"
        @click.stop
      >
        <div class="flex items-center justify-between p-4">
          <img
            src="/assets/images/logo-text-colored.png"
            alt="Arqui"
            class="w-[86px]"
          />
          <button @click="toggleMenu">
            <AqIcon icon="close" size="large" color="main-default" />
          </button>
        </div>

        <div class="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <div class="mb-6">
            <h3 class="subtitle-semibold mb-3">Para se atualizar</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-2 hover:text-main-darkest rounded"
                >
                  <AqIcon icon="bell" size="large" color="main-light" />
                  <span class="body-medium text-main-default"
                    >Notificações</span
                  >
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-2 hover:text-main-darkest rounded"
                >
                  <AqIcon
                    icon="notification-readed-lines"
                    size="large"
                    color="main-light"
                  />
                  <span class="body-medium text-main-default"
                    >Novidades do Arqui</span
                  >
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="subtitle-semibold mb-3">Ajustes</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-2 hover:text-main-darkest rounded"
                >
                  <AqIcon icon="settings" size="large" color="main-light" />
                  <span class="body-medium text-main-default"
                    >Configurações e Privacidade</span
                  >
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-2 hover:text-main-darkest rounded"
                >
                  <AqIcon
                    icon="question-circle"
                    size="large"
                    color="main-light"
                  />
                  <span class="body-medium text-main-default"
                    >Ajuda e suporte</span
                  >
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-2 hover:text-main-darkest rounded"
                >
                  <AqIcon icon="exit" size="large" color="critical-default" />
                  <span class="body-medium text-critical-default"
                    >Sair do Arqui</span
                  >
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
/* Animação de slide pura */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Garante que o overlay não interfira na animação */
.slide-enter-active div,
.slide-leave-active div {
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}
</style>

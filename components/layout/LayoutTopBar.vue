<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const userMenuOpen = ref(false);

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
};

const userMenuRef = ref(null);
const userButtonRef = ref(null);

const handleClickOutside = (event) => {
  if (
    userMenuRef.value &&
    !userMenuRef.value.contains(event.target) &&
    !userButtonRef.value.contains(event.target)
  ) {
    userMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <!-- Conteúdo principal -->
  <div class="flex-1 bg-white rounded-xl shadow-md p-6 m-4">
    <!-- Linha contendo título/subtítulo à esquerda e busca + botão à direita -->
    <div class="flex items-start justify-between mb-8 flex-wrap gap-4">
      <!-- Título e subtítulo -->
      <div class="flex-1 min-w-0">
        <h1 class="display-small text-default">Título</h1>
        <p class="text-light body-medium">Subtítulo da página</p>
      </div>

      <div class="cutout w-[286px] bg-surface-main-lightest">
        <div
          class="icons items-center border-edge-main-default border-1 shadow-bottom-low"
        >
          <!-- Ícones -->
          <div class="flex items-center gap-4.5">
            <a href="javascript:;">
              <AqIcon
                icon="notification-readed-lines"
                size="large"
                color="main-light"
              />
            </a>
            <a href="javascript:;">
              <AqIcon icon="chat-round" size="large" color="main-light" />
            </a>
            <a href="javascript:;">
              <AqIcon icon="bell" size="large" color="main-light" />
            </a>
          </div>

          <div class="h-[30px] w-px bg-surface-main-medium mx-[12px]"></div>

          <div class="relative">
            <a
              @click="toggleUserMenu"
              ref="userButtonRef"
              class="flex items-center gap-1 cursor-pointer"
            >
              <div
                class="flex items-center justify-center bg-surface-main-light rounded-full w-10 h-10 caption-semibold text-default p-2"
              >
                AR
              </div>
              <AqIcon icon="alt-arrow-down" size="xsmall" color="lighter" />
            </a>

            <div
              v-show="userMenuOpen"
              ref="userMenuRef"
              class="absolute right-[-110px] mt-4 w-[275px] bg-surface-main-default rounded-2 shadow-medium py-1 z-50"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
              >
                <AqIcon icon="user-rounded" size="large" color="main-light" />
                <span class="body-medium text-light">Meu perfil</span></a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
              >
                <AqIcon icon="settings" size="large" color="main-light" />
                <span class="body-medium text-light"
                  >Configurações e privacidade</span
                ></a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
              >
                <AqIcon
                  icon="question-circle"
                  size="large"
                  color="main-light"
                />
                <span class="body-medium text-light">Ajuda e suporte</span></a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
              >
                <AqIcon icon="logout-2" size="large" color="critical-default" />
                <span class="body-medium text-critical-default"
                  >Sair do Arqui</span
                ></a
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Barra de pesquisa e botão -->
      <div class="flex-1 min-w-0 flex items-end gap-4 w-full sm:w-auto">
        <div class="relative flex-1">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar"
            class="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button class="px-4 py-2 text-white rounded-md bg-buton" type="button">
          Nova ação
        </button>
      </div>
    </div>

    <div class="bg-gray-50 p-6 rounded-md border border-gray-200 min-h-[200px]">
      <p class="text-gray-600">
        Área do conteúdo principal que se adapta ao espaço disponível.
        <slot />
      </p>
    </div>
  </div>
</template>

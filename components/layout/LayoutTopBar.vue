<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import MobileTopBar from "./LayoutMobileTopBar.vue";

const userMenuOpen = ref(false);
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1025;
};

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
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <LayoutMobileTopBar v-if="isMobile" />

  <div
    class="flex-1 bg-white rounded-xl shadow-md px-8 py-6 m-4"
    :class="{ 'mt-[82px]': isMobile }"
  >
    <div class="flex items-start justify-between mb-8 flex-wrap gap-4">
      <div class="flex-1 min-w-0">
        <h1 class="display-small text-default">Título</h1>
        <p class="text-main-light body-medium">Subtítulo da página</p>
      </div>

      <div class="cutout w-[286px] bg-surface-main-lightest hidden lg:block">
        <div
          class="icons items-center border-edge-main-default border-1 shadow-bottom-low"
        >
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
                <span class="body-medium text-main-light">Meu perfil</span></a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
              >
                <AqIcon icon="settings" size="large" color="main-light" />
                <span class="body-medium text-main-light"
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
                <span class="body-medium text-main-light"
                  >Ajuda e suporte</span
                ></a
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

      <div class="flex-1 min-w-0 flex items-end gap-4 w-full sm:w-auto ml-4">
        <div class="relative flex-1">
          <AqField
            type="text"
            :placeholder="$t('search_field')"
            icon-left="magnifer"
          />
        </div>

        <AqButton sub-variant="default" class="body-semibold"
          >Nova Ação</AqButton
        >
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

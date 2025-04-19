<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMinimized = ref(false);
const isMobile = ref(false);

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<template>
  <!-- Desktop Sidebar -->
  <div
    v-show="!isMobile"
    :class="[
      'transition-all duration-300 ease-in-out h-person bg-white border-r border-gray-200 rounded-lg shadow-sm my-4 flex flex-col',
      isMinimized ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Conteúdo principal -->
    <div class="flex-1 overflow-hidden">
      <!-- Top Profile Section -->
      <div class="flex items-center p-4 mb-6 border-b">
        <div
          class="bg-surface-main-light w-10 h-10 rounded-full flex items-center justify-center caption-semibold text-default"
          :class="{ 'mx-auto': isMinimized }"
        >
          AR
        </div>
        <transition name="slide-fade">
          <div v-if="!isMinimized" class="flex items-center flex-1 min-w-0">
            <span class="ml-2 truncate subtitle-semibold text-default"
              >Arqui</span
            >
            <button class="ml-auto">
              <AqIcon
                icon="alt-arrow-up-down"
                size="xsmall"
                color="main-default"
              />
            </button>
          </div>
        </transition>
      </div>

      <!-- Menu Items -->
      <nav>
        <a
          href="#"
          class="py-3 flex items-center text-gray-600 hover:bg-gray-100"
          :class="{ 'px-6': !isMinimized }"
        >
          <AqIcon
            icon="ruler-cross-pen"
            size="large"
            color="main-light"
            :class="{ 'mx-auto': isMinimized }"
          />
          <transition name="slide-fade">
            <span
              v-if="!isMinimized"
              class="ml-3 truncate text-light subtitle-medium"
              >Projetos</span
            >
          </transition>
        </a>

        <a
          href="#"
          class="py-3 flex items-center text-gray-600 hover:bg-gray-100"
          :class="{ 'px-6': !isMinimized }"
        >
          <AqIcon
            icon="share-circle"
            size="large"
            color="main-light"
            :class="{ 'mx-auto': isMinimized }"
          />
          <transition name="slide-fade">
            <span
              v-if="!isMinimized"
              class="ml-3 truncate text-light subtitle-medium"
              >Equipe</span
            >
          </transition>
        </a>

        <a
          href="#"
          class="py-3 flex items-center text-gray-600 hover:bg-gray-100"
          :class="{ 'px-6': !isMinimized }"
        >
          <AqIcon
            icon="user-rounded"
            size="large"
            color="main-light"
            :class="{ 'mx-auto': isMinimized }"
          />
          <transition name="slide-fade">
            <span
              v-if="!isMinimized"
              class="ml-3 truncate text-light subtitle-medium"
              >Clientes</span
            >
          </transition>
        </a>

        <a
          href="#"
          class="py-3 flex items-center text-gray-600 hover:bg-gray-100"
          :class="{ 'px-6': !isMinimized }"
        >
          <AqIcon
            icon="delivery"
            size="large"
            color="main-light"
            :class="{ 'mx-auto': isMinimized }"
          />
          <transition name="slide-fade">
            <span
              v-if="!isMinimized"
              class="ml-3 truncate text-light subtitle-medium"
              >Fornecedores</span
            >
          </transition>
        </a>
      </nav>
    </div>

    <!-- Bottom Minimize Button -->
    <div
      class="p-4 flex items-center text-gray-600 hover:bg-gray-100 cursor-pointer"
      @click="toggleMinimize"
    >
      <AqIcon
        icon="sidebar"
        size="large"
        color="main-light"
        :class="{ 'mx-auto': isMinimized }"
      />
      <transition name="slide-fade">
        <span v-if="!isMinimized" class="ml-3 text-light subtitle-medium"
          >Minimizar</span
        >
      </transition>
    </div>
  </div>

  <!-- Mobile Bottom Navigation -->
  <div
    v-show="isMobile"
    class="fixed bottom-10 left-6 right-6 bg-white shadow-xl rounded-full"
  >
    <div class="flex justify-between items-center p-4 px-8">
      <div class="flex items-center justify-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      <div class="flex items-center justify-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 4.354a4 4 0 110 5.292M5.752 7.752a3 3 0 115.298 1.858m1.95 3.39h-9a2 2 0 01-2-2 8 8 0 1116 0 2 2 0 01-2 2h-1.015m-7.93 3h7.89"
          />
        </svg>
      </div>
      <div class="flex items-center justify-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <div class="flex items-center justify-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <div class="w-px h-8 bg-surface-main-light mx-1"></div>
      <div
        class="flex items-center justify-center bg-surface-main-light rounded-full w-10 h-10 caption-semibold text-default"
      >
        AR
      </div>
    </div>
  </div>
</template>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>

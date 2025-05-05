<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMinimized = ref(false);
const isMobile = ref(false);
const isMediumScreen = ref(false);
const showWorkspaceSelector = ref(false);

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

const checkScreenSize = () => {
  const width = window.innerWidth;
  isMobile.value = width < 1024;
  isMediumScreen.value = width >= 1025 && width <= 1365;

  if (isMediumScreen.value) {
    isMinimized.value = true;
  }
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
  <div
    v-show="!isMobile"
    :class="[
      'transition-all duration-300 ease-in-out h-person bg-white border-r border-gray-200 rounded-lg shadow-sm my-4 flex flex-col',
      isMinimized || isMediumScreen ? 'w-18' : 'w-64',
    ]"
  >
    <div class="flex-1 overflow-hidden">
      <div class="flex items-center p-4 mb-2">
        <div
          class="bg-surface-main-light w-10 h-10 rounded-full flex items-center justify-center caption-semibold text-default"
          :class="{ 'mx-auto': isMinimized || isMediumScreen }"
        >
          AR
        </div>
        <transition name="slide-fade">
          <div
            v-if="!isMinimized && !isMediumScreen"
            class="flex items-center flex-1 min-w-0"
          >
            <span class="ml-2 truncate subtitle-semibold text-default"
              >Arqui</span
            >
            <button class="ml-auto" @click="showWorkspaceSelector = true">
              <AqIcon
                icon="alt-arrow-up-down"
                size="xsmall"
                color="main-default"
              />
            </button>
          </div>
        </transition>
      </div>
      <div
        class="border-b m-auto"
        :class="{ 'w-[42px]': isMinimized, 'w-[225px]': !isMinimized }"
      ></div>

      <nav class="mt-6">
        <a
          href="#"
          class="py-3 flex items-center subtitle-medium text-main-light hover:text-main-default"
          :class="{ 'px-6': !isMinimized && !isMediumScreen }"
        >
          <AqIcon
            icon="ruler-cross-pen"
            size="large"
            color="main-light"
            :class="{ 'mx-auto': isMinimized || isMediumScreen }"
          />
          <transition name="slide-fade">
            <span v-if="!isMinimized && !isMediumScreen" class="ml-3 truncate"
              >Projetos</span
            >
          </transition>
        </a>

        <a
          href="#"
          class="py-3 flex items-center subtitle-medium text-main-light hover:text-main-default"
          :class="{ 'px-6': !isMinimized && !isMediumScreen }"
        >
          <AqIcon
            icon="share-circle"
            size="large"
            color="main-light"
            :class="{ 'mx-auto': isMinimized || isMediumScreen }"
          />
          <transition name="slide-fade">
            <span v-if="!isMinimized && !isMediumScreen" class="ml-3 truncate"
              >Equipe</span
            >
          </transition>
        </a>

        <a
          href="#"
          class="py-3 flex items-center subtitle-medium text-main-light hover:text-main-default"
          :class="{ 'px-6': !isMinimized && !isMediumScreen }"
        >
          <AqIcon
            icon="user-rounded"
            size="large"
            color="main-light"
            :class="{ 'mx-auto': isMinimized || isMediumScreen }"
          />
          <transition name="slide-fade">
            <span v-if="!isMinimized && !isMediumScreen" class="ml-3 truncate"
              >Clientes</span
            >
          </transition>
        </a>

        <a
          href="#"
          class="py-3 flex items-center subtitle-medium text-main-light hover:text-main-default"
          :class="{ 'px-6': !isMinimized && !isMediumScreen }"
        >
          <AqIcon
            icon="delivery"
            size="large"
            color="main-light"
            :class="{ 'mx-auto': isMinimized || isMediumScreen }"
          />
          <transition name="slide-fade">
            <span v-if="!isMinimized && !isMediumScreen" class="ml-3 truncate"
              >Fornecedores</span
            >
          </transition>
        </a>
      </nav>
    </div>

    <div
      v-if="!isMediumScreen"
      class="p-4 flex items-center subtitle-medium text-main-light hover:text-main-default cursor-pointer"
      @click="toggleMinimize"
    >
      <AqIcon
        icon="sidebar"
        size="large"
        color="main-light"
        :class="{ 'mx-auto': isMinimized || isMediumScreen }"
      />
      <transition name="slide-fade">
        <span v-if="!isMinimized && !isMediumScreen" class="ml-3"
          >Minimizar</span
        >
      </transition>
    </div>
  </div>

  <div
    v-show="isMobile"
    class="fixed bottom-10 left-6 right-6 bg-white shadow-bottom-medium rounded-2xl w-[296px] m-auto"
  >
    <div class="flex justify-between items-center py-3 px-5">
      <div class="flex items-center justify-center text-gray-500">
        <a href="#">
          <AqIcon
            icon="ruler-cross-pen"
            size="large"
            color="main-light"
            class="hover:text-brand-default"
          />
        </a>
      </div>
      <div class="flex items-center justify-center text-gray-500">
        <a href="#">
          <AqIcon
            icon="share-circle"
            size="large"
            color="main-light"
            class="hover:text-brand-default"
          />
        </a>
      </div>
      <div class="flex items-center justify-center text-gray-500">
        <a href="#">
          <AqIcon
            icon="user-rounded"
            size="large"
            color="main-light"
            class="hover:text-brand-default"
          />
        </a>
      </div>
      <div class="flex items-center justify-center text-gray-500">
        <a href="#">
          <AqIcon
            icon="delivery"
            size="large"
            color="main-light"
            class="hover:text-brand-default"
          />
        </a>
      </div>
      <div class="w-px h-8 bg-surface-main-light mx-1"></div>
      <div
        class="flex items-center justify-center bg-surface-main-light rounded-full w-10 h-10 caption-semibold text-default"
      >
        AR
      </div>
    </div>
  </div>
  <Teleport to="body">
    <AqWorkspaceSelector
      v-if="showWorkspaceSelector"
      @close="showWorkspaceSelector = false"
      @new-workspace="console.log('Novo workspace')"
    />
  </Teleport>
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

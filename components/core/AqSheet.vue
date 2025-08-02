<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  progressStep: {
    type: Number,
    default: 1,
  },
  progressTotal: {
    type: Number,
    default: 1,
  },
  buttons: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close"]);

const isMobile = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth < 1025;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50">
    <div
      class="absolute inset-0 bg-overlay-default"
      @click="$emit('close')"
    ></div>

    <div
      :class="[
        'bg-surface-main-default flex flex-col shadow-right-high rounded-2 z-10',
        isMobile
          ? 'absolute inset-0 m-auto w-full max-w-[480px] max-h-[90vh]'
          : 'absolute right-5 top-5 bottom-5 w-full max-w-[480px]',
      ]"
    >
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-edge-main-default"
      >
        <h2 class="title-semibold text-main-default truncate">{{ title }}</h2>
        <button @click="$emit('close')">
          <AqIcon icon="close" size="medium" color="main-default" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-6 py-6">
        <slot />
      </div>

      <div
        v-if="progressTotal > 1"
        class="w-full h-[3px] bg-surface-main-light"
      >
        <div
          class="h-full bg-brand-default transition-all duration-300 ease-in-out"
          :style="{ width: `${(progressStep / progressTotal) * 100}%` }"
        ></div>
      </div>

      <div
        v-if="buttons.length"
        class="flex gap-4 border-t border-edge-main-default px-6 py-4"
      >
        <template v-for="(button, index) in buttons" :key="index">
          <AqButton
            :variant="button.variant || 'main'"
            :sub-variant="button.subVariant || 'default'"
            :loading="button.loading"
            :disabled="button.disabled"
            :full-width="buttons.length === 1"
            class="flex-1"
            @click="button.onClick"
          >
            {{ button.label }}
          </AqButton>
        </template>
      </div>
    </div>
  </div>
</template>

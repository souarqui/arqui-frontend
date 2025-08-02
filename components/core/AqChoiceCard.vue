<template>
  <div
    :class="{
      'bg-surface-brand-lightest border-edge-brand-default': isSelected,
      'bg-surface-main-default border-edge-main-default': !isSelected,
    }"
    @click="selectCard"
    class="cursor-pointer border rounded-xl px-3 py-3 sm:px-3 sm:py-6 shadow-bottom-low flex flex-row sm:flex-col items-center sm:text-center"
  >
    <AqIllustration
      :illustration="illustration"
      class="mb-0 opacity-70 w-20 h-20 sm:h-32 sm:w-32 mx-0 sm:mx-auto"
      :class="{
        '': isSelected,
        'mix-blend-luminosity': !isSelected,
      }"
    ></AqIllustration>
    <div class="sm:mt-2 ml-3 sm:ml-0">
      <h3 class="body-semibold text-main-default">{{ title }}</h3>
      <p
        class="caption-medium mt-2"
        :class="{
          'text-default': isSelected,
          'text-main-light': !isSelected,
        }"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  value: {
    type: String || Number,
    required: true,
  },
  modelValue: {
    type: String || Number,
    required: false,
  },
  illustration: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isSelected = computed(() => props.modelValue === props.value);

const selectCard = () => {
  emit("update:modelValue", props.value);
};
</script>

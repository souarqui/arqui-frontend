<template>
  <div
    class="inline-flex items-center h-[54px] p-1 bg-surface-main-lightest rounded-4 space-x-1"
  >
    <button
      v-for="segment in segments"
      :key="segment.value"
      @click="select(segment.value)"
      :class="[
        'px-4 h-full flex items-center gap-2 body-semibold transition-all rounded-4',
        isSelected(segment.value)
          ? 'bg-surface-main-default text-main-darkest shadow-bottom-medium'
          : 'text-main-default hover:bg-surface-main-default',
      ]"
    >
      <AqIcon
        v-if="segment.icon"
        :icon="segment.icon"
        size="small"
        :color="isSelected(segment.value) ? 'main-darkest' : 'main-default'"
      />
      {{ segment.label }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  segments: {
    type: Array,
    required: true,
    validator: (arr) => arr.every((s) => s.value && s.label),
  },
  modelValue: [String, Number],
});

const emit = defineEmits(["update:modelValue"]);

const current = ref(props.modelValue ?? props.segments?.[0]?.value);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== current.value) current.value = newVal;
  }
);

const select = (val) => {
  current.value = val;
  emit("update:modelValue", val);
};

const isSelected = (val) => val === current.value;
</script>

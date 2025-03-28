<template>
  <div
    :class="[
      'flex items-center justify-between h-11 p-4 border rounded-xl',
      disabled ? 'bg-surface-main-light' : 'bg-surface-main-default',
      hasError
        ? 'border-edge-critical-default'
        : isFocused
        ? 'border-edge-main-dark'
        : 'border-edge-main-default',
    ]"
  >
    <AqIcon v-if="iconLeft" :icon="iconLeft" size="xsmall" class="mr-2" />

    <span v-if="currency" class="body-medium text-main-light mr-2">R$</span>

    <input
      :type="inputType"
      :value="value"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('change', $event)"
      @keypress="$emit('keypress', $event)"
      @keyup="$emit('keyup', $event)"
      @keydown="$emit('keydown', $event)"
      @focus="
        isFocused = true;
        $emit('focus', $event);
      "
      @blur="
        isFocused = false;
        $emit('blur', $event);
      "
      class="flex-1 bg-transparent text-main-default text-sm focus:outline-none"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
    />

    <AqIcon
      v-if="showToggleIcon"
      :icon="currentIconRight"
      size="xsmall"
      class="ml-2 cursor-pointer"
      @click="togglePasswordVisibility"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: null,
  },
  iconLeft: {
    type: String,
    default: null,
  },
  currency: {
    type: Boolean,
    default: false,
  },
  caption: {
    type: String,
    default: null,
  },
  iconRight: {
    type: String,
    default: null,
  },
  maxlength: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "update:modelValue",
  "change",
  "keypress",
  "keyup",
  "keydown",
]);

const inputType = ref(props.type);
const currentIconRight = ref(props.iconRight);
const isFocused = ref(false);

const showToggleIcon = computed(
  () => props.type === "password" || !!props.iconRight
);

const togglePasswordVisibility = () => {
  if (inputType.value === "password") {
    inputType.value = "text";
    currentIconRight.value = "eye";
  } else {
    inputType.value = "password";
    currentIconRight.value = "eye-closed";
  }
};

if (props.type === "password" && !props.iconRight) {
  currentIconRight.value = "eye-closed";
}
</script>

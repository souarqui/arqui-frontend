<template>
  <div class="aq-field">
    <AqLabel
      v-if="label"
      :text="label"
      :info="info"
      :optional="optional"
      :caption="caption"
      class="mb-2"
    />

    <AqInput
      :value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      @change="$emit('change', $event)"
      @keypress="$emit('keypress', $event)"
      @keyup="$emit('keyup', $event)"
      @keydown="$emit('keydown', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      :type="type"
      :placeholder="placeholder"
      :icon-left="iconLeft"
      :currency="currency"
      :caption="inputCaption"
      :icon-right="computedIconRight"
      :maxlength="maxlength"
      :disabled="disabled"
      :has-error="hasError"
    />
  </div>

  <div v-if="hasError" class="text-critical-default caption-semibold mt-2">
    <AqIcon
      icon="info-circle"
      color="critical-default"
      size="xsmall"
      class="mr-1 -mt-0.5"
    />
    <span>{{ hasError }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
    required: false,
  },
  info: {
    type: String,
    default: "",
  },
  optional: {
    type: Boolean,
    default: false,
  },
  caption: {
    type: String,
    default: null,
  },
  modelValue: {
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
  inputCaption: {
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
  "blur",
  "focus",
]);

const computedIconRight = computed(() => {
  if (props.type === "password") {
    return null;
  }

  return props.iconRight;
});
</script>

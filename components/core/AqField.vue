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

    <component :is="resolvedComponent" v-bind="fieldProps" v-model="model" />

    <div
      v-if="hasError"
      class="text-critical-default caption-semibold mt-2 flex items-center"
    >
      <AqIcon
        icon="info-circle"
        color="critical-default"
        size="xsmall"
        class="mr-1 -mt-0.5"
      />
      <span>{{ hasError }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import AqInput from "./AqInput.vue";
import AqSelect from "./AqSelect.vue";
import AqLabel from "./AqLabel.vue";

const props = defineProps({
  modelValue: [String, Number, null],
  type: {
    type: String,
    default: "text",
  },
  label: String,
  info: String,
  optional: Boolean,
  caption: String,
  iconLeft: String,
  iconRight: String,
  inputCaption: String,
  currency: Boolean,
  maxlength: String,
  disabled: Boolean,
  hasError: String,
  placeholder: String,
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const resolvedComponent = computed(() => {
  switch (props.type) {
    case "select":
      return AqSelect;
    case "text":
    case "password":
    default:
      return AqInput;
  }
});

const fieldProps = computed(() => {
  return {
    type: props.type,
    placeholder: props.placeholder,
    iconLeft: props.iconLeft,
    iconRight: props.iconRight,
    caption: props.inputCaption,
    currency: props.currency,
    maxlength: props.maxlength,
    disabled: props.disabled,
    hasError: props.hasError,
    options: props.options,
  };
});
</script>

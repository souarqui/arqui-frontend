<template>
  <component
    :is="computedTag"
    :type="computedButtonType"
    :to="isRouterLink ? to : undefined"
    :href="isExternalLink ? to : undefined"
    :class="computedClass"
    :disabled="isButton && disabled"
    @click="handleClick"
  >
    <template v-if="props.loading">
      <AqIcon
        icon="loading"
        color="main-default"
        :size="props.variant == 'main' ? 'large' : 'xsmall'"
        class="loading-icon"
      />
    </template>
    <template v-else>
      <AqIcon
        v-if="computedIconLeft"
        :icon="computedIconLeft"
        :color="computedIconColorLeft"
        :size="props.variant == 'main' ? 'large' : 'xsmall'"
        class="mr-2"
      />
      <slot />
      <AqIcon
        v-if="computedIconRight"
        :icon="computedIconRight"
        :color="computedIconColorRight"
        size="xsmall"
        class="ml-2"
      />
    </template>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  to: {
    type: String,
    default: null,
  },
  iconLeft: {
    type: String,
    default: null,
  },
  iconRight: {
    type: String,
    default: null,
  },
  external: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "brand",
  },
  subVariant: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "huge",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const router = useRouter();

const isButton = computed(
  () => props.type === "button" || props.type === "submit"
);

const computedTag = computed(() => {
  if (props.type === "link") {
    return props.external || props.to ? "a" : "span";
  }
  return "button";
});

const computedButtonType = computed(() => {
  if (props.type === "submit") {
    return "submit";
  }
  return "button";
});

const isRouterLink = computed(
  () => !props.external && props.to && !props.to.startsWith("http")
);
const isExternalLink = computed(
  () => props.external || (props.to && props.to.startsWith("http"))
);

const computedClass = computed(() => {
  let baseClass = "inline-flex items-center justify-center body-semibold";

  if (props.subVariant == "light") {
    if (props.disabled) {
      baseClass += ` bg-surface-${props.variant}-light text-main-default`;
    } else {
      if (isButton.value) {
        baseClass += ` bg-surface-${props.variant}-light text-main-default hover:bg-surface-${props.variant}-medium active:bg-surface-${props.variant}-medium`;
      } else {
        baseClass += ` text-main-default hover:text-inverse-default`;
      }
    }
  }
  if (props.variant == "main") {
    if (props.disabled) {
      baseClass += ` bg-surface-${props.variant}-default text-main-default`;
    } else {
      if (isButton.value) {
        baseClass += ` bg-surface-${props.variant}-default text-main-default hover:bg-surface-${props.variant}-lightest active:bg-surface-${props.variant}-lightest`;
      } else {
        baseClass += ` text-main-default hover:text-inverse-default`;
      }
    }
  } else {
    if (props.disabled) {
      baseClass += ` bg-surface-${props.variant}-lightest text-${props.variant}-lightest`;
    } else {
      if (isButton.value) {
        baseClass += ` bg-surface-${props.variant}-default text-inverse-default hover:bg-surface-${props.variant}-dark active:bg-surface-${props.variant}-dark`;
      } else {
        baseClass += ` text-${props.variant}-default hover:text-${props.variant}-darkest`;
      }
    }
  }

  if (props.disabled || props.loading) {
    baseClass += ` cursor-not-allowed`;
  } else {
    baseClass += ` cursor-pointer`;
  }

  if (isButton.value) {
    baseClass += ` px-4 h-${props.height} rounded-2`;
  }

  if (props.fullWidth) {
    baseClass += " w-full";
  }

  if (props.type != "link") {
    baseClass += ` border-1`;
  }

  return baseClass;
});

const computedIconColorRight = computed(() => {
  if (props.disabled) {
    return `${props.variant}-lightest`;
  } else if (isButton.value) {
    return "inverse-default";
  } else {
    return `${props.variant}-default`;
  }
});

const computedIconColorLeft = computed(() => {
  if (props.disabled) {
    return `${props.variant}-lightest`;
  } else if (isButton.value) {
    return "inverse-default";
  } else {
    return `${props.variant}-default`;
  }
});

const computedIconRight = computed(() => {
  if (props.external) {
    return "square-top-down";
  }
  return props.iconRight;
});

const computedIconLeft = computed(() => {
  return props.iconLeft;
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    if (isRouterLink.value) {
      event.preventDefault();
      navigateTo(props.to);
    } else {
      emit("click", event);
    }
  }
};
</script>

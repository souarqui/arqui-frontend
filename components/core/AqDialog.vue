<template>
  <transition name="fade" mode="out-in">
    <div
      class="fixed inset-0 flex items-center justify-center z-50"
      v-if="isActive"
    >
      <div
        class="absolute inset-0"
        :class="`bg-overlay-${mask}`"
        @click="dismiss(backdrop)"
      ></div>
      <div
        :class="[
          'relative z-10 bg-surface-main-default rounded-lg px-6 py-8 text-center w-full',
          computedSizeClasses,
        ]"
      >
        <div
          v-if="computedIcon"
          :class="[
            `bg-surface-${computedVariant}-lightest`,
            'flex items-center justify-center w-huger h-huger rounded-full mx-auto mb-4',
          ]"
        >
          <AqIcon
            :icon="computedIcon"
            size="xlarge"
            :color="`${computedVariant}-default`"
          />
        </div>

        <h3 class="title-semibold sm:display-small text-default">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="subtitle-medium text-main-light mt-2">
          {{ subtitle }}
        </p>
        <p
          v-if="optional"
          class="body-semibold sm:subtitle-semibold text-default mt-4"
        >
          {{ optional }}
        </p>

        <div class="mt-6 space-y-3">
          <AqButton
            v-if="submitButton"
            @click="primaryAction"
            :variant="computedVariant"
            full-width
          >
            {{ submitButton }}
          </AqButton>
          <AqButton
            v-if="assistiveButton"
            @click="assistiveAction"
            variant="main"
            sub-variant="light"
            full-width
          >
            {{ assistiveButton }}
          </AqButton>
          <AqButton
            v-if="closeButton"
            type="link"
            class="body-semibold"
            @click="dismiss()"
          >
            {{ $t("close") }}
          </AqButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { defineEmits } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    },
  },
  type: {
    type: String,
    default: null,
    validator(value) {
      return ["positive", "warning", "critical"].includes(value);
    },
  },
  mask: {
    type: String,
    default: "default",
  },
  variant: {
    type: String,
    default: "brand",
  },
  title: {
    type: String,
    default: null,
  },
  subtitle: {
    type: String,
    default: null,
  },
  optional: {
    type: String,
    default: null,
  },
  submitButton: {
    type: String,
    required: false,
  },
  assistiveButton: {
    type: String,
    required: false,
  },
  closeButton: {
    type: Boolean,
    required: false,
  },
  icon: {
    type: String,
    default: "home-smile",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  backdrop: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onSubmit", "onAssistive", "onDismiss"]);

const primaryAction = () => {
  emit("onSubmit");
};

const assistiveAction = () => {
  emit("onAssistive");
};

const dismiss = (backdrop = false) => {
  if (!backdrop) emit("onDismiss");
};

const computedSizeClasses = computed(() => {
  switch (props.size) {
    case "small":
      return "max-w-xs";
    case "large":
      return "max-w-lg";
    default:
      return "max-w-sm";
  }
});

const computedVariant = computed(() => {
  return props.type ? props.type : props.variant;
});

const computedIcon = computed(() => {
  if (props.type) {
    switch (props.type) {
      case "positive":
        return "check-circle";
      case "warning":
        return "danger-circle";
      case "critical":
        return "close-circle";
    }
  }
  return props.icon;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

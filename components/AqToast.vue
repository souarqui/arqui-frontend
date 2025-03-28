<template>
  <div
    v-if="toastState.visible"
    :class="[
      'aq-toast',
      toastState.position,
      { 'fade-out': toastState.fadeOut },
    ]"
    @click="dismiss"
  >
    {{ toastState.message }}
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";

const toastState = reactive({
  message: "",
  position: "bottom-center",
  visible: false,
  fadeOut: false,
});

function showToast(message, position = "bottom-center", duration = 3000) {
  toastState.message = message;
  toastState.position = position;
  toastState.visible = true;
  toastState.fadeOut = false;

  setTimeout(() => {
    toastState.fadeOut = true;
    setTimeout(() => {
      toastState.visible = false;
      toastState.fadeOut = false;
    }, 300);
  }, duration);
}

function dismiss() {
  toastState.visible = false;
  toastState.fadeOut = false;
}

defineExpose({ showToast, dismiss, toastState: toRefs(toastState) });
</script>

<style scoped>
.aq-toast {
  padding: 10px 20px;
  color: #fff;
  border-radius: 12px;
  cursor: pointer;
  position: fixed;
  z-index: 1000;
  text-align: center;
  max-width: 400px;
  width: 90vw;
  display: flex;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
  @apply text-xsmall font-semibold leading-xsmall bg-surface-main-darker text-inverse-default;
}

.aq-toast.fade-out {
  animation: fadeOut 0.3s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    bottom: 10px;
  }
  to {
    opacity: 1;
    bottom: 20px;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    bottom: 20px;
  }
  to {
    opacity: 0;
    bottom: 10px;
  }
}

.aq-toast.bottom-center {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.aq-toast.top-center {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.aq-toast.bottom-right {
  bottom: 20px;
  right: 20px;
}
.aq-toast.bottom-left {
  bottom: 20px;
  left: 20px;
}
.aq-toast.top-right {
  top: 20px;
  right: 20px;
}
.aq-toast.top-left {
  top: 20px;
  left: 20px;
}
</style>

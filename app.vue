<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AqDialog
      ref="AqDialogRef"
      :is-active="alertIsActive"
      :title="options.title"
      :subtitle="options.subtitle"
      :optional="options.optional"
      :submit-button="options.submitButton"
      :assistive-button="options.assistiveButton"
      :icon="options.icon"
      :mask="options.mask"
      :variant="options.variant"
      :size="options.size"
      :type="options.type"
      @on-assistive="assistiveAlert"
      @on-dismiss="dismissAlert"
    />
    <AqToast />
  </div>
</template>

<script setup>
import { useAlertStore } from "~/stores/alert";
import { storeToRefs } from "pinia";

const alertStore = useAlertStore();
const { isActive: alertIsActive, options } = storeToRefs(alertStore);
const AqDialogRef = ref(null);

const dismissAlert = () => {
  alertStore.hide();
};

const assistiveAlert = () => {
  alertStore.hide();
};

onMounted(() => {
  window.$AqDialog = AqDialogRef.value;
});
</script>

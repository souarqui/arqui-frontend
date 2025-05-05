<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center max-lg:items-end max-lg:justify-center bg-overlay-default"
  >
    <div
      class="bg-surface-main-default rounded-2 p-6 shadow-bottom-medium w-[400px] max-lg:w-full max-lg:rounded-t-2"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="title-semibold">Seus workspaces</h3>
        <button @click="$emit('close')">
          <AqIcon icon="close" size="large" color="main-default" />
        </button>
      </div>

      <div
        class="mb-6 border border-edge-main-default rounded-2 overflow-hidden"
      >
        <div class="flex items-center p-4 bg-white">
          <div
            class="bg-surface-main-light w-10 h-10 rounded-full flex items-center justify-center caption-semibold text-default mr-2"
          >
            AR
          </div>
          <div>
            <p class="subtitle-semibold">Arqui</p>
            <p class="caption-medium text-main-light">Workspace atual</p>
          </div>
        </div>

        <div class="h-px bg-edge-main-default"></div>

        <button
          class="flex items-center p-4 w-full text-left bg-white hover:bg-surface-main-lightest"
        >
          <div
            class="bg-surface-main-light w-10 h-10 rounded-full flex items-center justify-center caption-semibold text-default mr-2"
          >
            CR
          </div>
          <p class="subtitle-semibold flex-1">Croqui</p>
          <AqIcon icon="alt-arrow-right" size="small" color="main-default" />
        </button>
      </div>

      <AqButton
        sub-variant="default"
        class="body-semibold"
        @click="$emit('new-workspace')"
        full-width
        >Novo workspace</AqButton
      >
    </div>
  </div>
</template>

<script setup>
defineEmits(["close", "new-workspace"]);
</script>

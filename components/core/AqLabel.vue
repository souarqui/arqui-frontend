<template>
  <div class="aq-label">
    <label class="label-text flex items-center">
      <span class="text-main-default text-xsmall">{{ text }}</span>

      <span v-if="optional" class="text-main-light text-xsmall font-medium ml-1"
        >({{ $t("optional") }})</span
      >

      <AqIcon
        v-if="info"
        v-tippy="info"
        icon="info-circle"
        color="brand-default"
        size="xsmall"
        class="cursor-pointer ml-1 outline-none"
      />
    </label>

    <!-- Caption -->
    <p v-if="caption" class="caption-regular text-main-light mt-1">
      {{ caption }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
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
});
</script>

<style scoped></style>

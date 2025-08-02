<template>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <use :href="`${spritePath}#${illustration}`" />
  </svg>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  illustration: {
    type: String,
    required: true,
  },
  cacheBuster: {
    type: String,
    default: () => new Date().getTime().toString(),
  },
});

const spritePath = `/assets/images/illustrations.svg?v=${props.cacheBuster}`;
</script>

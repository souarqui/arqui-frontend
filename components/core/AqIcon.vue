<template>
  <svg
    :class="computedClass"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <use :href="spriteUrl" />
  </svg>
</template>

<script>
import styles from "./AqIcon.module.scss";

export default {
  name: "AqIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "medium",
      validator(value) {
        return [
          "gigant",
          "huger",
          "xhuger",
          "huge",
          "larger",
          "xlarge",
          "large",
          "medium",
          "small",
          "xsmall",
          "smaller",
        ].includes(value);
      },
    },
    className: {
      type: String,
      default: "",
    },
    spritePath: {
      type: String,
      default: "/assets/images/icons.svg",
    },
    cacheBuster: {
      type: String,
      default: () => new Date().getTime().toString(),
    },
  },
  computed: {
    spriteUrl() {
      return `${this.spritePath}?v=${this.cacheBuster}#${this.icon.replace(
        /\s/g,
        "/"
      )}`;
    },
    computedClass() {
      const colorClassPrefix = this.icon.startsWith("bold-")
        ? "aq-icon--fill-"
        : "aq-icon--color-";

      return [
        styles["aq-icon"],
        styles[`aq-icon--size-${this.size}`],
        styles[`${colorClassPrefix}${this.color}`],
        this.className,
      ].join(" ");
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="w-full">
    <label class="block text-sm font-medium mb-2 text-main-default">
      {{ label }}
    </label>

    <div class="relative" ref="dropdownRef">
      <button
        type="button"
        @click="toggle"
        class="w-full bg-surface-main-default text-left px-4 py-2 rounded-2 border border-border-default flex justify-between items-center"
      >
        <span>
          {{ displayLabel }}
        </span>
        <AqIcon icon="alt-arrow-down" size="small" />
      </button>

      <div
        v-if="open"
        class="absolute mt-2 w-full bg-white border border-border-default rounded-2 shadow-lg z-50"
      >
        <div class="p-3">
          <AqField
            v-model="search"
            icon-left="magnifer"
            placeholder="Buscar..."
            class="w-full"
          />
        </div>
        <ul class="max-h-60 overflow-y-auto">
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            @click="select(option)"
            class="px-4 py-2 hover:bg-surface-main-light cursor-pointer body-medium text-main-light"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";

const props = defineProps({
  label: String,
  modelValue: [String, Number, null],
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Selecione...",
  },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const search = ref("");
const dropdownRef = ref(null);

// Fecha o dropdown ao clicar fora
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    open.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
);

const toggle = () => {
  open.value = !open.value;
  search.value = "";
};

const select = (option) => {
  emit("update:modelValue", option.value);
  open.value = false;

  // aguarda próximo tick para forçar atualização do label visual
  nextTick(() => {
    search.value = "";
  });
};

const filteredOptions = computed(() => {
  return props.options.filter((opt) =>
    opt.label.toLowerCase().includes(search.value.toLowerCase())
  );
});

const displayLabel = computed(() => {
  const match = props.options.find((opt) => opt.value === props.modelValue);
  return match ? match.label : props.placeholder;
});
</script>

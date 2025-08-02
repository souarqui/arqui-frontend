<script setup>
import { ref, watch } from "vue";

const loading = ref(false);
const showSheet = ref(false);
const selectedCategory = ref(null);
const selectedSegment = ref("settings");

const openSheet = () => {
  showSheet.value = true;
};
const closeSheet = () => {
  showSheet.value = false;
};

watch(selectedSegment, (newVal) => {
  console.log("Segmento selecionado:", newVal);
});
</script>

<template>
  <div class="flex items-center justify-center h-full text-center p-6">
    <div class="w-full max-w-[400px] mx-auto flex flex-col items-center">
      <AqIllustration
        illustration="workspace-construction"
        class="w-full mb-6"
      />
      <h2 class="display-small mb-2">Sem nada por aqui</h2>
      <p class="title-medium text-main-light mb-4">
        Parece que não temos fornecedores cadastrados, vamos começar?
      </p>
      <AqButton
        variant="brand"
        :loading="loading"
        type="button"
        @click="openSheet"
      >
        Cadastrar Fornecedor
      </AqButton>
    </div>
  </div>

  <AqSheet
    :show="showSheet"
    title="Novo fornecedor"
    :progressStep="1"
    :progressTotal="3"
    :buttons="[
      {
        label: 'Cancelar',
        onClick: closeSheet,
        variant: 'main',
        subVariant: 'light',
      },
      { label: 'Próxima', onClick: () => {}, variant: 'brand' },
    ]"
    @close="closeSheet"
  >
    <p class="text-main-default">Escolha o tipo de fornecedor...</p>
    <AqField
      v-model="selectedCategory"
      type="select"
      :options="[
        { value: 'automacao', label: 'Automação residencial' },
        { value: 'ar', label: 'Ar-condicionado' },
        { value: 'aquecimento', label: 'Aquecimento' },
        { value: 'coberturas', label: 'Coberturas' },
        { value: 'construcao', label: 'Construção civil' },
      ]"
    />

    <AqSegment
      v-model="selectedSegment"
      :segments="[
        { value: 'overview', label: 'Visão Geral', icon: 'eye' },
        { value: 'finance', label: 'Financeiro' },
        { value: 'settings', label: 'Configurações', icon: 'settings' },
      ]"
    />
  </AqSheet>
</template>

<style scoped>
.h-full-adjusted {
  height: 92%;
}
</style>

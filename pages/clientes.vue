<template>
  <div class="flex items-center justify-center h-full-adjusted text-center p-6">
    <div class="w-full max-w-[400px] mx-auto flex flex-col items-center">
      <AqIllustration
        illustration="workspace-construction"
        class="w-full mb-6"
      />
      <h2 class="display-small mb-2">Sem nada por aqui</h2>
      <p class="title-medium text-main-light mb-4">
        Parece que não temos clientes cadastrados, vamos começar?
      </p>
      <AqButton :loading="loading" type="submit">Cadastrar Cliente</AqButton>
    </div>
  </div>
</template>

<style scoped>
.h-full-adjusted {
  height: 92%;
}
</style>

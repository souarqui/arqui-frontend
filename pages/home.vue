<template>
  <div>
    <div
      class="bg-gray-50 p-6 rounded-md border border-gray-200 min-h-[200px]"
      v-if="authStore.user"
    >
      <h1>Bem-vindo ao Dashboard {{ authStore.user.first_name }}!</h1>
      <p>Somente usuários autenticados podem ver essa página.</p>
    </div>
    <div v-else>
      <p>Carregando...</p>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();

useHead({
  title: "Home",
});

definePageMeta({
  requiresAuth: true,
  layout: "default",
});
</script>

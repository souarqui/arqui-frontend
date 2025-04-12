<template>
  <div v-if="authStore.user">
    <h1>Bem-vindo ao Dashboard {{ authStore.user.first_name }}!</h1>
    <p>Somente usuários autenticados podem ver essa página.</p>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>

<script setup>
const authStore = useAuthStore();

useHead({
  title: "Home",
});

definePageMeta({
  requiresAuth: true,
});
</script>

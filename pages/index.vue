<template>
  <div></div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    return navigateTo("/auth/login");
  } else {
    return navigateTo("/home");
  }
});
</script>

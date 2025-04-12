export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (process.client) {
    await authStore.restoreSession();
  }

  if (
    authStore.user?.metadata &&
    !authStore.user.metadata.onboarded_at &&
    to.path !== "/onboarding"
  ) {
    return navigateTo("/onboarding");
  }

  if (to.path === "/") {
    return navigateTo(authStore.user ? "/home" : "/auth/login");
  }
});

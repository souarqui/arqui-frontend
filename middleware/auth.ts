export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.user && localStorage.getItem("authToken")) {
    await authStore.fetchUser();
  }

  if (to.meta.requiresAuth && !authStore.user) {
    return navigateTo("/auth/login");
  }

  if (
    authStore.user &&
    authStore.user.metadata &&
    !authStore.user.metadata.onboarded_at &&
    to.path !== "/onboarding"
  ) {
    return navigateTo("/onboarding");
  }

  if (to.path === "/") {
    return navigateTo("/home");
  }
});

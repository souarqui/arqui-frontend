<template>
  <div class="min-h-screen flex">
    <div class="w-full max-w-lg lg:max-w-md px-6 py-12 mx-auto content-center">
      <div class="flex justify-center mb-8">
        <img
          src="/assets/images/logo-text-colored.png"
          alt="Logo"
          class="h-12 w-auto"
        />
      </div>
      <h2
        class="title-semibold sm:display-large text-main-default text-center mb-2"
      >
        {{ $t("login_your_account") }}
      </h2>
      <p class="body-medium sm:title-medium text-main-light text-center mb-8">
        {{ $t("slogan") }}
      </p>

      <div class="space-y-3">
        <AqIcon icon="teste" color="main-default" />

        <AqButton
          icon-left="social-google"
          @click="loginWithProvider('google')"
          variant="main"
          full-width
        >
          {{ $t("login_gmail") }}
        </AqButton>

        <AqButton
          icon-left="social-microsoft"
          @click="loginWithProvider('microsoft')"
          variant="main"
          full-width
        >
          {{ $t("login_microsoft") }}
        </AqButton>
      </div>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-edge-main-default"></div>
        </div>
        <div class="relative flex justify-center">
          <span
            class="bg-surface-main-default px-2 caption-medium text-main-default"
          >
            {{ $t("or") }}
          </span>
        </div>
      </div>

      <form @submit.prevent="login" @keydown="form.onKeydown($event)">
        <div class="mb-4">
          <AqField
            :label="$t('email')"
            v-model="form.email"
            :has-error="form.errors.get('email')"
          />
        </div>

        <div>
          <AqField
            :label="$t('password')"
            type="password"
            v-model="form.password"
            :has-error="form.errors.get('password')"
          />

          <div class="text-right mt-2">
            <AqButton type="link" class="body-semibold" :to="'/auth/recover'">
              {{ $t("forget_password") }}
            </AqButton>
          </div>
        </div>

        <div class="mt-6">
          <AqButton :loading="loading" type="submit" full-width>{{
            $t("enter")
          }}</AqButton>
        </div>
      </form>

      <div class="text-center">
        <p class="mt-6 body-medium text-main-default">
          {{ $t("dont_have_account") }}
          <AqButton type="link" class="body-semibold" :to="'/auth/register'">
            {{ $t("signup") }}
          </AqButton>
        </p>
      </div>
    </div>

    <div
      class="hidden lg:block relative w-full lg:w-3/5 bg-cover bg-center m-6 rounded-4"
      style="
        background-image: url('/assets/images/login-hero.jpg');
        background-position: center center;
      "
    >
      <img
        src="/assets/images/logo-square-white.png"
        class="absolute top-6 right-6"
        style="width: 6rem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

useHead({
  title: "Login",
});

definePageMeta({
  layout: "blank",
});

const router = useRouter();
const authStore = useAuthStore();
const { $vform } = useNuxtApp();

const loading = ref(false);

// Verifica se já está autenticado
if (process.client && authStore.user && localStorage.getItem("authToken")) {
  navigateTo("/");
}

// Inicializa o formulário corretamente
const form = ref(
  $vform({
    email: "",
    password: "",
  })
);

const login = async () => {
  try {
    loading.value = true;
    const response = await form.value.post(
      "/auth/login",
      {},
      {
        withCredentials: true, // Se necessário
      }
    );

    const tokenAuth = response.data.token;
    const userAuth = response.data.user;

    if (tokenAuth && userAuth) {
      authStore.setUserData(userAuth, tokenAuth);
      await navigateTo("/");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  } finally {
    loading.value = false;
  }
};

const loginWithProvider = async (provider) => {
  try {
    loading.value = true;
    const response = await form.value.post(`/auth/login/${provider}`);

    authStore.setUserData(response.data.user, response.data.token);
    await navigateTo("/");
  } catch (error) {
    console.error(`Erro ao fazer login com ${provider}:`, error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex relative">
    <div
      class="absolute top-4 left-0 right-0 flex items-center justify-center"
      v-if="step < 3"
    >
      <a href="#" @click.prevent="goBack" class="absolute left-6 top-4">
        <AqIcon icon="arrow-left" size="larger" />
      </a>
      <img
        src="/assets/images/logo-text-colored.png"
        alt="Logo"
        class="h-12 mt-3 w-auto lg:hidden"
      />
    </div>

    <div class="w-full max-w-lg lg:max-w-md px-6 py-12 mx-auto content-center">
      <div class="flex justify-center mb-8 hidden lg:flex">
        <img
          src="/assets/images/logo-text-colored.png"
          alt="Logo"
          class="h-12 w-auto"
        />
      </div>

      <template v-if="step === 1">
        <h2
          class="title-semibold sm:display-large text-main-default text-center mb-2"
        >
          {{ $t("create_account") }}
        </h2>
        <p class="body-medium sm:title-medium text-main-light text-center mb-8">
          {{ $t("slogan") }}
        </p>

        <div class="space-y-3">
          <AqButton
            icon-left="social-google"
            @click="register"
            variant="main"
            full-width
          >
            {{ $t("login_gmail") }}
          </AqButton>

          <AqButton
            icon-left="social-microsoft"
            @click="register"
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

        <form @submit.prevent="register" @keydown="formStep1.onKeydown($event)">
          <div class="mb-4">
            <AqField
              :label="$t('email')"
              v-model="formStep1.key"
              :has-error="formStep1.errors.get('key')"
            />
          </div>

          <div>
            <AqField
              :label="$t('password')"
              type="password"
              v-model="formStep1.password"
              :has-error="formStep1.errors.get('password')"
            />
          </div>

          <div class="mt-6">
            <AqButton :loading="loading" type="submit" full-width>{{
              $t("register")
            }}</AqButton>
          </div>
        </form>
      </template>

      <template v-else-if="step === 2">
        <h2
          class="title-semibold sm:display-large text-main-default text-center mb-2"
        >
          {{ $t("sended_email") }}
        </h2>
        <p class="body-medium sm:title-medium text-main-light text-center mb-8">
          {{ $t("insert_code_to_your_email") }}
        </p>

        <AqOtp
          type="email"
          :to="formStep1.key"
          action="register"
          v-model="token"
          @onVerificationSuccess="finishRegister"
          @onCorrectionEmail="setStep(1)"
        />
      </template>
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
import { useAuthStore } from "@/stores/auth";

useHead({
  title: "Cadastrar",
});

definePageMeta({
  layout: "blank",
});

const { $api } = useNuxtApp();
const router = useRouter();
const authStore = useAuthStore();
const { $vform } = useNuxtApp();

const step = ref(1);
const loading = ref(false);
const token = ref("");

const formStep1 = ref(
  $vform({
    key: "",
    action: "register",
    type: "email",
    password: "",
  })
);

const setStep = (value) => {
  step.value = value;
};

const register = async () => {
  loading.value = true;
  try {
    await formStep1.value.post("/token/send");
    setStep(2);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const finishRegister = async () => {
  try {
    await $api.request.post("/register/finish", {
      email: formStep1.value.key,
      password: formStep1.value.password,
      token: token.value,
    });

    const response = await $api.request.post(
      "/auth/login",
      {
        email: formStep1.value.key,
        password: formStep1.value.password,
      },
      { withCredentials: true }
    );

    const tokenAuth = response.data.data.token;
    const userAuth = response.data.data.user;

    if (tokenAuth && userAuth) {
      authStore.setUserData(userAuth, tokenAuth);
      navigateTo("/");
    } else {
      navigateTo("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const goBack = () => {
  if (step.value === 1) {
    navigateTo("/auth/login");
  } else {
    setStep(1);
    formStep1.value.reset();
    token.value = "";
    loading.value = false;
  }
};
</script>

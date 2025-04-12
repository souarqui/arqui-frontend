<template>
  <div class="min-h-screen flex relative">
    <div class="absolute top-4 left-0 right-0 flex items-center justify-center">
      <img
        src="/assets/images/logo-text-colored.png"
        alt="Logo"
        class="h-12 mt-3 w-auto"
      />
    </div>

    <transition name="fade" mode="out-in">
      <div
        :key="step"
        :class="dynamicMaxWidthClass"
        class="w-full px-3 py-12 mx-auto content-center pt-24 sm:pt-0"
      >
        <template v-if="step === 1">
          <h2
            class="title-semibold sm:display-medium text-main-default text-center mb-2"
          >
            {{ $t("onboarding_step1_title") }}
          </h2>
          <p
            class="body-medium sm:title-medium text-main-light text-center mb-8"
          >
            {{ $t("onboarding_step1_subtitle") }}
          </p>

          <div class="mb-4">
            <AqField :label="$t('how_call_you')" v-model="name" />
          </div>

          <div class="mt-6">
            <AqButton
              :loading="loading"
              type="button"
              icon-right="arrow-right"
              :disabled="disableStep1"
              @click="setStep(2)"
              full-width
              >{{ $t("next") }}</AqButton
            >
          </div>
        </template>

        <template v-else-if="step === 2">
          <h2
            class="title-semibold sm:display-large text-main-default text-center mb-2"
          >
            {{ $t("onboarding_step2_title") }}
          </h2>
          <p
            class="body-medium sm:title-medium text-main-light text-center mb-8"
          >
            {{ $t("onboarding_step2_subtitle") }}
          </p>

          <div class="mb-4">
            <AqField
              :label="$t('workspace')"
              v-model="workspaceName"
              :placeholder="$t('example_arqui')"
            />
          </div>

          <div class="mt-6 space-y-4">
            <AqButton
              type="button"
              icon-right="arrow-right"
              :disabled="disableStep2"
              @click="setStep(3)"
              full-width
              >{{ $t("next") }}</AqButton
            >
            <AqButton
              type="link"
              class="body-semibold"
              @click="setStep(1)"
              full-width
            >
              {{ $t("back") }}
            </AqButton>
          </div>
        </template>

        <template v-else-if="step === 3">
          <h2
            class="title-semibold sm:display-large text-main-default text-center mb-2"
          >
            {{ $t("onboarding_step3_title") }}
          </h2>
          <p
            class="body-medium sm:title-medium text-main-light text-center mb-8"
          >
            {{ $t("onboarding_step3_subtitle") }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <AqChoiceCard
              illustration="workspace-business"
              :title="$t('plan_opt1_title')"
              :subtitle="$t('plan_opt1_subtitle')"
              v-model="planWorkspace"
              value="business"
            />
            <AqChoiceCard
              illustration="workspace-professional"
              :title="$t('plan_opt2_title')"
              :subtitle="$t('plan_opt2_subtitle')"
              v-model="planWorkspace"
              value="professional"
            />
            <AqChoiceCard
              illustration="workspace-educational"
              :title="$t('plan_opt3_title')"
              :subtitle="$t('plan_opt3_subtitle')"
              v-model="planWorkspace"
              value="educational"
            />
          </div>

          <div class="mt-6 space-y-4">
            <div class="flex justify-center">
              <AqButton
                :loading="loading"
                type="button"
                icon-right="arrow-right"
                class="w-full lg:w-[80%] lg:mx-auto"
                :disabled="!planWorkspace"
                @click="registerWorkspace"
                >{{ $t("next") }}</AqButton
              >
            </div>
            <AqButton
              type="link"
              class="body-semibold"
              @click="setStep(2)"
              full-width
            >
              {{ $t("back") }}
            </AqButton>
          </div>
        </template>

        <template v-if="step === 4">
          <h2
            class="title-semibold sm:display-large text-main-default text-center mb-4"
          >
            {{ $t("onboarding_step4_title") }}
          </h2>
          <p
            class="body-medium sm:title-medium text-main-light text-center mb-8"
          >
            {{ $t("onboarding_step4_subtitle") }}
          </p>

          <div v-for="(email, index) in fixedEmails" :key="index" class="mb-3">
            <AqLabel
              v-if="index == 0"
              :text="$t('invite_with_email')"
              :optional="true"
              :info="$t('can_invite_more_people')"
              class="mb-2"
            ></AqLabel>
            <AqField
              v-model="fixedEmails[index]"
              placeholder="E-mail"
              :has-error="hasError['fixed-' + index] ? $t('invalid_email') : ''"
              @blur="validateEmailOnBlur(fixedEmails[index], 'fixed-' + index)"
            />
          </div>

          <div
            v-for="(email, index) in emails"
            :key="index"
            class="mb-3 flex items-center space-x-2"
          >
            <div class="flex-grow">
              <AqField
                v-model="emails[index]"
                placeholder="E-mail"
                :has-error="
                  hasError['dynamic-' + index] ? $t('invalid_email') : ''
                "
                @blur="validateEmailOnBlur(emails[index], 'dynamic-' + index)"
              />
            </div>
            <AqButton type="link" @click="removeEmail(index)" class="w-8 pt-1">
              <AqIcon icon="trash" color="critical-default" size="large" />
            </AqButton>
          </div>

          <p class="caption-medium text-main-light" v-if="emails.length == 2">
            {{ $t("can_invite_more_after") }}
          </p>
          <AqButton
            type="link"
            @click="addEmail"
            class="body-semibold"
            icon-left="plus-circle"
            v-else-if="emails.length < 2"
          >
            {{ $t("more_one_email") }}
          </AqButton>

          <div class="mt-6 border-t border-edge-main-default pt-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="subtitle-semibold text-default">
                  {{ $t("invite_with_link") }}
                </p>
                <p class="caption-medium text-main-light pr-10">
                  {{ $t("invite_with_link_info") }}
                </p>
              </div>
              <AqButton
                @click="copyLink"
                type="button"
                variant="main"
                class="w-36"
              >
                {{ $t("copy_link") }}
              </AqButton>
            </div>
          </div>

          <div class="mt-6 space-y-4">
            <div class="flex justify-center">
              <AqButton
                :loading="loading"
                type="button"
                icon-right="arrow-right"
                :disabled="disableInviteButton"
                @click="sendInvites"
                full-width
              >
                {{ isInviteMode ? $t("invite_and_conclude") : $t("conclude") }}
              </AqButton>
            </div>
            <AqButton
              type="link"
              class="body-semibold"
              @click="setStep(3)"
              full-width
              >{{ $t("back") }}</AqButton
            >
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

useHead({
  title: "Onboarding",
});

import { AqField } from "@/components/aqfield";
import { AqLabel } from "@/components/aqlabel";
import { AqButton } from "@/components/aqbutton";
import { AqIcon } from "@/components/aqicon";
import { AqChoiceCard } from "@/components/aqchoicecard";
import { showToast } from "@/components/aqtoast";

const router = useRouter();
const loading = ref(false);
const step = ref(1);
const name = ref("");
const workspaceName = ref("");
const planWorkspace = ref(null);
const disableStep1 = ref(true);
const disableStep2 = ref(true);
const workspaceLoaded = ref(null);

const fixedEmails = ref(["", "", ""]);
const emails = ref([]);
const hasError = ref({});

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isInviteMode = computed(() => {
  return (
    fixedEmails.value.some((email) => email.trim() !== "") ||
    emails.value.some((email) => email.trim() !== "")
  );
});

const disableInviteButton = computed(() => {
  const allEmails = [...fixedEmails.value, ...emails.value];
  return (
    allEmails.every((email) => email.trim() === "") ||
    Object.values(hasError.value).includes(true)
  );
});

const validateEmailOnBlur = (email, key) => {
  console.log("blured");
  hasError.value[key] = email.trim() && !isValidEmail(email);
};

watch(name, (newValue) => {
  disableStep1.value = newValue.length < 2;
});

watch(workspaceName, (newValue) => {
  disableStep2.value = newValue.length < 2;
});

const addEmail = () => {
  emails.value.push("");
};

const removeEmail = (index) => {
  emails.value.splice(index, 1);
};

const copyLink = async () => {
  try {
    const inviteLink = `${window.location.origin}/invite/workspace/${workspaceLoaded.value.shareable_hash}`;
    await navigator.clipboard.writeText(inviteLink);
    showToast(this.$t("link_copied_to_transference"), "bottom-center");
  } catch (err) {
    console.error("Erro ao copiar o link:", err);
  }
};

const setStep = (s) => {
  step.value = s;
};

const registerWorkspace = async () => {
  loading.value = true;
  try {
    const dataRegister = {
      name: name.value,
      workspace_name: workspaceName.value,
      type: planWorkspace.value,
    };

    if (workspaceLoaded.value) {
      dataRegister.workspace_id = workspaceLoaded.value.id;
    }

    const responseRegister = await $api.post(
      "/onboarding/create",
      dataRegister,
      { withCredentials: true }
    );

    workspaceLoaded.value = responseRegister.data.data;
    step.value = 4;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const sendInvites = async () => {
  loading.value = true;

  const allEmails = [...fixedEmails.value, ...emails.value].filter(
    (email) => email.trim() !== ""
  );

  if (allEmails.length === 0) {
    setTimeout(() => {
      loading.value = false;
      navigateTo("/home");
    }, 2000);
    return;
  }

  try {
    await $api.post("/onboarding/invite", {
      emails: allEmails,
      uuid: workspaceLoaded.value?.uuid,
    });

    setTimeout(() => {
      loading.value = false;
      navigateTo("/home");
    }, 2000);
  } catch (error) {
    console.error("Erro ao enviar convites:", error);
  } finally {
    loading.value = false;
  }
};

const dynamicMaxWidthClass = computed(() => {
  return step.value === 1 || step.value === 2 || step.value === 4
    ? "max-w-lg"
    : "max-w-3xl";
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

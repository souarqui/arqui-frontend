<template>
  <div class="flex flex-col items-center space-y-8">
    <div class="flex space-x-2">
      <input
        v-for="(digit, index) in otp"
        :key="index"
        v-model="otp[index]"
        type="tel"
        maxlength="1"
        pattern="[0-9]*"
        inputmode="numeric"
        :class="[
          'w-huge h-huge text-center rounded-2 border focus:outline-none',
          errorMessage
            ? 'border-edge-critical-default focus:border-edge-critical-default'
            : '',
          otp[index] && !errorMessage
            ? 'border-edge-brand-default'
            : 'focus:border-edge-brand-default',
          !otp[index] && !errorMessage
            ? 'border-edge-main-default focus:border-edge-brand-default'
            : '',
        ]"
        @input="onInput(index)"
        @keydown.backspace="onBackspace(index)"
        @paste="onPaste"
        @keypress="onKeyPress"
        ref="otpInput"
      />
    </div>
    <div v-if="!errorMessage">
      <AqButton
        v-if="timeLeft === 0"
        type="link"
        class="body-semibold"
        @click="toggleDialogResend"
        >{{ $t("dont_received_code") }}</AqButton
      >
      <p class="text-brand-lightest body-semibold" v-else>
        {{ $t("resend_code_in") }} {{ formattedTime }}
      </p>
    </div>
    <div
      v-if="errorMessage"
      class="body-semibold text-critical-default mt-2 flex items-center"
    >
      <AqIcon
        icon="bold-close-circle"
        color="critical-default"
        size="xsmall"
        class="mr-1"
      />
      <span>{{ errorMessage }}</span>
    </div>
  </div>

  <AqDialog
    :is-active="dialogResend"
    mask="default"
    variant="brand"
    :title="$t('dont_received_code')"
    :subtitle="$t('confirm_email_otp')"
    :optional="props.to"
    :submitButton="$t('resend_code')"
    :assistiveButton="$t('adjust_email')"
    icon="home-smile"
    @onSubmit="handleDialogSubmit"
    @onAssistive="handleDialogAssistive"
    @onDismiss="toggleDialogResend"
  />
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useNuxtApp } from "#app";

const { $api } = useNuxtApp();

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  length: {
    type: Number,
    default: 6,
  },
  type: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "onVerificationSuccess",
  "onCorrectionEmail",
]);

const router = useRouter();

const RESEND_INTERVAL = 120;

const dialogResend = ref(false);
const otp = ref(Array(props.length).fill(""));
const otpInput = ref([]);
const errorMessage = ref(null);
const timeLeft = ref(RESEND_INTERVAL);
let countdown = null;
let backspaceCount = 0;

const sendToken = async () => {
  try {
    await $api.request.post("/token/send", {
      action: props.action,
      key: props.to,
      type: props.type,
    });
  } catch (error) {
    errorMessage.value = t("error_send_code");
  }
};

const onInput = (index) => {
  if (otp.value[index] && index < otp.value.length - 1) {
    nextTick(() => {
      otpInput.value[index + 1]?.focus();
    });
  }
  emitOtp();
};

const onBackspace = (index) => {
  if (index === 0) {
    backspaceCount++;
    if (backspaceCount === 1) {
      resetOtp();
    }
  } else if (otp.value.every((char) => char === "")) {
    errorMessage.value = null;
    startCountdown();
  }
  if (index > 0 && otp.value[index] === "") {
    nextTick(() => {
      otpInput.value[index - 1]?.focus();
    });
  }
};

const onPaste = (event) => {
  const paste = event.clipboardData?.getData("text") || "";
  const characters = paste.split("").slice(0, props.length);

  characters.forEach((char, index) => {
    otp.value[index] = char;
  });

  nextTick(() => {
    const nextIndex =
      characters.length < props.length ? characters.length : props.length - 1;
    otpInput.value[nextIndex]?.focus();
  });

  emitOtp();
  event.preventDefault();
};

const onKeyPress = (event) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

const emitOtp = async () => {
  const otpValue = otp.value.join("");
  emit("update:modelValue", otpValue);

  if (otp.value.every((char) => char !== "")) {
    try {
      await $api.request.post("/token/check", {
        key: props.to,
        token: otpValue,
      });

      emit("onVerificationSuccess");
    } catch (error) {
      errorMessage.value = t("incorrect_code");
    }
  }
};

const resetOtp = () => {
  otp.value = Array(props.length).fill("");
  errorMessage.value = null;
  backspaceCount = 0;
  startCountdown();
  nextTick(() => {
    otpInput.value[0]?.focus();
  });
};

const handleDialogSubmit = async () => {
  timeLeft.value = RESEND_INTERVAL;
  try {
    await sendToken();
    errorMessage.value = null;
    startCountdown();
  } catch (error) {
    errorMessage.value = t("error_send_code");
  }

  toggleDialogResend();
};

const handleDialogAssistive = async () => {
  emit("onCorrectionEmail");
  toggleDialogResend();
};

const toggleDialogResend = () => {
  dialogResend.value = !dialogResend.value;
};

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
});

const startCountdown = () => {
  if (countdown) clearInterval(countdown);
  countdown = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1;
    } else {
      clearInterval(countdown);
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});
</script>

<style scoped></style>

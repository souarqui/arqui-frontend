import AqDialog from "~/components/AqDialog.vue";
import AqButton from "~/components/AqButton.vue";
import AqChoiceCard from "~/components/AqChoiceCard.vue";
import AqField from "~/components/AqField.vue";
import AqIcon from "~/components/AqIcon.vue";
import AqInput from "~/components/AqInput.vue";
import AqLabel from "~/components/AqLabel.vue";
import AqOtp from "~/components/AqOtp.vue";
import AqToast from "~/components/AqToast.vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("AqDialog", AqDialog);
  nuxtApp.vueApp.component("AqButton", AqButton);
  nuxtApp.vueApp.component("AqChoiceCard", AqChoiceCard);
  nuxtApp.vueApp.component("AqField", AqField);
  nuxtApp.vueApp.component("AqIcon", AqIcon);
  nuxtApp.vueApp.component("AqInput", AqInput);
  nuxtApp.vueApp.component("AqLabel", AqLabel);
  nuxtApp.vueApp.component("AqOtp", AqOtp);
  nuxtApp.vueApp.component("AqToast", AqToast);
});

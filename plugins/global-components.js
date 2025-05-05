import AqDialog from "~/components/core/AqDialog.vue";
import AqButton from "~/components/core/AqButton.vue";
import AqChoiceCard from "~/components/core/AqChoiceCard.vue";
import AqField from "~/components/core/AqField.vue";
import AqIcon from "~/components/core/AqIcon.vue";
import AqInput from "~/components/core/AqInput.vue";
import AqLabel from "~/components/core/AqLabel.vue";
import AqOtp from "~/components/core/AqOtp.vue";
import AqToast from "~/components/core/AqToast.vue";
import AqWorkspaceSelector from "~/components/core/AqWorkspaceSelector.vue";
import LayoutSidebarApp from "~/components/layout/LayoutSidebarApp.vue";
import LayoutTopBar from "~/components/layout/LayoutTopBar.vue";

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
  nuxtApp.vueApp.component("AqWorkspaceSelector", AqWorkspaceSelector);
  nuxtApp.vueApp.component("LayoutSidebarApp", LayoutSidebarApp);
  nuxtApp.vueApp.component("LayoutTopBar", LayoutTopBar);
});

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import toast from "@/plugins/toast";
import { apiClient, apiUpload } from "./plugins/axiosConfig";
Vue.prototype.$apiClient = apiClient;
Vue.prototype.$apiUpload = apiUpload;

import VueMasonry from "vue-masonry-css";
Vue.use(VueMasonry);
import moment from "moment";
Vue.prototype.moment = moment;
import momentJS from "vue-moment";
Vue.use(momentJS);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  toast,
  render: (h) => h(App),
}).$mount("#app");

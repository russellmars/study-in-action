import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "whatwg-fetch";
import "./registerServiceWorker";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import filters from "./filters";
import VueLazyload from "vue-lazyload";
import { retina } from "@mars/common";
import "@mars/cnode-styles";

retina();
Vue.use(VueLazyload);

dayjs.locale("zh-cn");

Vue.use(filters);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import postTab from "./post-tab";
import datetime from "./datetime";
import fromNow from "./from-now";

export default {
  install(vue: typeof Vue) {
    Vue.filter("postTab", postTab);
    Vue.filter("datetime", datetime);
    Vue.filter("fromNow", fromNow);
  }
};

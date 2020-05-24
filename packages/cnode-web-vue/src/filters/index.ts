import postTab from "./post-tab";
import datetime from "./datetime";
import fromNow from "./from-now";
import Vue from "vue";

export default {
  install(vue: typeof Vue) {
    vue.filter("postTab", postTab);
    vue.filter("datetime", datetime);
    vue.filter("fromNow", fromNow);
  }
};

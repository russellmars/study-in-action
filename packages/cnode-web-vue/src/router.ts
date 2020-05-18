import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { controllers } from "@mars/cnode-apis";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/topic/:id",
      name: "topic",
      props: true,
      component: () =>
        import(/* webpackChunkName: "topic" */ "./views/Topic.vue")
    },
    {
      path: "/user/:loginname",
      name: "user",
      props: true,
      component: () => import(/* webpackChunkName: "user" */ "./views/User.vue")
    }
  ]
});

async function abortPrevPageController() {
  if (controllers) {
    while (controllers.length > 0) {
      const controller = controllers.shift();
      controller && controller.abort();
    }
  }
}

router.beforeEach((to, from, next) => {
  abortPrevPageController();
  next();
});

export default router;

import VueRouter from "vue-router";
import Vue from 'vue'

Vue.use(VueRouter)
const routes = [
  {
    path: "/a",
    // component: () => import("./component1.vue"),
    component: require("./component1.vue").default,
  },
  {
    path: "/b",
    // component: () => import("./component2.vue"),
    component: require("./component2.vue").default,
  },
];

export default new VueRouter({
  routes,
});

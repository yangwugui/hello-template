import { createRouter, createWebHistory } from "vue-router"
import NProgress from "nprogress" // progress bar
import "nprogress/nprogress.css"

import { appRoutes } from "./routes"
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from "./base"
import createRouteGuard from "./guard"

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "login" },
    {
      path: "/login",
      name: "login",
      meta: { hidden: true, title: "登录", requiresAuth: false },
      component: () => import("@/views/login/index.vue"),
    },

    ...appRoutes,

    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

export default router

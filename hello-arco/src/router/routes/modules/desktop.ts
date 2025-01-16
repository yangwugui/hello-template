import { DEFAULT_ROUTE_NAME } from "@/router/constants"
import { DEFAULT_LAYOUT, type AppRouteRecordRaw } from "../../base"

const route: AppRouteRecordRaw = {
  path: "/workspace",
  name: "Workspace",
  component: DEFAULT_LAYOUT,
  meta: {
    hideInMenu: true,
    locale: "工作台",
    requiresAuth: true,
    icon: "icon-dashboard",
    order: 0,
  },
  children: [
    {
      path: "default",
      name: DEFAULT_ROUTE_NAME,
      component: () => import("@/views/dashboard/workplace/index.vue"),
      meta: {
        locale: "工作台",
        requiresAuth: true,
      },
    },
  ],
}

export default route

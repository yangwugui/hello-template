import type { RouteRecordRaw, RouteMeta, NavigationGuard } from "vue-router"
import { REDIRECT_ROUTE_NAME } from "@/router/constants"
import { defineComponent } from "vue"

declare module "vue-router" {
  interface RouteMeta {
    roles?: string[] // Controls roles that have access to the page
    requiresAuth: boolean // Whether login is required to access the current page (every route must declare)
    icon?: string // The icon show in the side menu
    locale?: string // The locale name show in side menu and breadcrumb
    hideInMenu?: boolean // If true, it is not displayed in the side menu
    hideChildrenInMenu?: boolean // if set true, the children are not displayed in the side menu
    activeMenu?: string // if set name, the menu will be highlighted according to the name you set
    order?: number // Sort routing menu items. If set key, the higher the value, the more forward it is
    noAffix?: boolean // if set true, the tag will not affix in the tab-bar
    ignoreCache?: boolean // if set true, the page will not be cached
  }
}

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw {
  path: string
  name?: string | symbol
  meta?: RouteMeta
  redirect?: string
  component: Component | string
  children?: AppRouteRecordRaw[]
  alias?: string | string[]
  props?: boolean | Record<string, any>
  beforeEnter?: NavigationGuard | NavigationGuard[]
  fullPath?: string
}

export const DEFAULT_LAYOUT = () => import("@/layout/default-layout.vue")

export const REDIRECT_MAIN: RouteRecordRaw = {
  path: "/redirect",
  name: "redirectWrapper",
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      path: "/redirect/:path",
      name: REDIRECT_ROUTE_NAME,
      component: () => import("@/views/redirect/index.vue"),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "notFound",
  component: () => import("@/views/not-found/index.vue"),
}

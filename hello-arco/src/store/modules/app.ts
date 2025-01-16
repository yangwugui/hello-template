import { defineStore } from "pinia"
import { Notification } from "@arco-design/web-vue"
import type { RouteRecordNormalized } from "vue-router"
import defaultSettings from "@/config/settings.json"
import * as api from "@/api"

export interface AppState {
  theme: string
  colorWeak: boolean
  navbar: boolean
  menu: boolean
  topMenu: boolean
  hideMenu: boolean
  menuCollapse: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  globalSettings: boolean
  device: string
  tabBar: boolean
  menuFromServer: boolean
  serverMenu: RouteRecordNormalized[]
  [key: string]: unknown
}

const useAppStore = defineStore("app", {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
    appDevice(state: AppState) {
      return state.device
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[]
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-expect-error-next-line
      this.$patch(partial)
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = "dark"
        document.body.setAttribute("arco-theme", "dark")
      } else {
        this.theme = "light"
        document.body.removeAttribute("arco-theme")
      }
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    async fetchServerMenuConfig() {
      try {
        Notification.info({
          id: "menuNotice", // Keep the instance id the same
          content: "loading",
          closable: true,
        })
        const { data } = await api.auth.getMenuList()
        this.serverMenu = data
        Notification.success({
          id: "menuNotice",
          content: "success",
          closable: true,
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        Notification.error({
          id: "menuNotice",
          content: "error",
          closable: true,
        })
      }
    },
    clearServerMenu() {
      this.serverMenu = []
    },
  },
})

export default useAppStore

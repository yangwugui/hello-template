import { defineStore } from "pinia"
import { setToken, clearToken } from "@/utils/auth"
import { removeRouteListener } from "@/utils/route-listener"
import useAppStore from "./app"
import * as api from "@/api"
import type { Profile } from "@/common/user"

const useUserStore = defineStore("user", {
  state: (): Profile => ({}) as Profile,

  getters: {
    userProfile(state: Profile): Profile {
      return { ...state }
    },
  },

  actions: {
    // Set user's information
    setUserProfile(partial: Partial<Profile>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetUserProfile() {
      this.$reset()
    },

    // Get user's information
    async getUserProfile() {
      const profile = await api.auth.getProfile()

      this.setUserProfile(profile)
    },

    // Login
    async login(params: { username: string; password: string }) {
      try {
        const data = await api.auth.login(params)
        setToken(data.access_token)
      } catch (err) {
        clearToken()
        throw err
      }
    },

    // Logout
    async logout() {
      try {
        await api.auth.logout()
      } finally {
        const appStore = useAppStore()
        this.resetUserProfile()
        clearToken()
        removeRouteListener()
        appStore.clearServerMenu()
      }
    },
  },
})

export default useUserStore

import useUserStore from "./modules/user"
import useAppStore from "./modules/app"
import useTabBarStore from "./modules/tab-bar"
import { createPinia } from "pinia"

const pinia = createPinia()

export { useAppStore, useUserStore, useTabBarStore }

export default pinia

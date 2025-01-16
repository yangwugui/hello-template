import type { RouteRecordNormalized } from "vue-router"

const externalModules = import.meta.glob("./externalModules/*.ts", { eager: true })
const modules = import.meta.glob("./modules/*.ts", { eager: true })

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })
  return result
}

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(externalModules, [])

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

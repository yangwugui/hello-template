import { defaultApiOptions, axiosInstance } from "@/api/helper/http"
import { setToken } from "./utils/auth"

defaultApiOptions.onError = onErrorDefault

axiosInstance.defaults.baseURL = "/api"
axiosInstance.defaults.timeout = 60 * 1000 // 默认请求超时60秒
function tip(message: string) {
  alert(message)
}

function toLogin() {
  window.location.href = "/login"
}

// 根据 restful 的约定，promise.reject 分三种：有 status=200 fail, status!=200, 其他
function onErrorDefault(error: any) {
  if (!error.response) {
    if (import.meta.env.DEV) {
      alert(error)
    } else {
      tip?.("未知错误：" + error.message)
    }
    return
  }
  const { status, data } = error.response
  if (status === 200 && data.errorMessage) {
    tip(data.message || "业务处理发生错误")
    return
  }
  switch (status) {
    case 401:
      tip?.("登录失效，即将跳转到登录页 ...")
      setToken("")
      setTimeout(() => {
        toLogin()
      }, 500)
      break
    case 403:
      tip?.("当前账号没有操作权限。")
      break
    case 404:
      tip?.("要求的资源不存在。")
      break
    case 405:
      tip?.("请求的方法不允许。")
      break
    case 413:
      tip?.("上传的文件过大。")
      break
    case 502:
      tip?.("当前服务不可用，请稍后再试。")
      break
    default:
      tip?.("系统错误: http status " + status)
  }
}

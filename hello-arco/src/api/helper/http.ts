import { getToken, setToken } from "@/utils/auth"
import axios, { type AxiosRequestConfig } from "axios"

export const axiosInstance = axios.create()

const CancelToken = axios.CancelToken
const source = CancelToken.source()

export type ApiOptions = {
  tokenKey: string
  tokenLocalExpires: number
  onError?: ((error: any) => void) | null
  onBefore?: (() => void) | null
  onAfter?: () => void | null
  offLineError?: () => void | null
}

export const defaultApiOptions = {
  tokenKey: "access_token",
  tokenLocalExpires: 24 * 60 * 60 * 1000,
} as ApiOptions

axiosInstance.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8"
axiosInstance.defaults.headers.put["Content-Type"] = "application/json; charset=utf-8"

//请求拦截器，两个功能：token，showLoading
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers["Authorization"] = "Bearer " + token
    }
    config.cancelToken = source.token
    return config
  },
  (error) => Promise.reject(error),
)

// 说明：axios 默认不满足 status >= 200 && status < 300 时，都返回 rejected promise。
// http status = 200, response.result = "fail" 时，return Promise.reject(response.data)。
axiosInstance.interceptors.response.use(
  (response) => {
    const newToken = response.headers[defaultApiOptions.tokenKey.toLocaleLowerCase()]
    if (newToken) {
      setToken(newToken)
    }
    // response.data.result === "fail": 发生业务处理错误。
    if (response.data.result === "fail") {
      return Promise.reject(response)
    }
    // response.data.result === undefined：返回的数据不是带 result 的对象，比如文件流
    // response.data.result === "success": 成功返回json数据。
    return response
  },
  // http status != 200 时，返回 error或者response本身：
  // 1. 有 response 响应体
  // 2. 未知错误，比如网络错误，由代理响应的异常。
  (error) => {
    const { response } = error
    if (response) {
      return Promise.reject(response)
    } else {
      return Promise.reject(error)
    }
  },
)

// 设置 null，可以禁用uiOptions的默认值，设置有效值可以覆盖默认值
async function httpRequest(
  method: string,
  url: string,
  data?: any,
  apiOptions?: ApiOptions,
  config?: AxiosRequestConfig<any>,
) {
  const options = { ...defaultApiOptions, ...apiOptions }

  if (!window.navigator.onLine && options?.offLineError) {
    options.offLineError()
    return
  }

  if (options.onBefore) {
    options.onBefore()
  }
  try {
    const result = await axiosInstance.request({ method, url, data, ...config })
    if (options.onAfter) {
      options.onAfter()
    }
    //!!! IMPORTANT: 返回response.data，而不是response, 如果要直接返回response，需要使用axiosInstance.request()
    return result.data
  } catch (error) {
    if (options.onAfter) {
      options.onAfter()
    }
    if (options.onError) {
      options.onError(error)
    }
  }
}

//!!! IMPORTANT: 返回response.data，而不是response, 如果要直接返回response，需要使用axiosInstance.request()
export const http = {
  get(url: string, opt?: ApiOptions, cfg?: AxiosRequestConfig<any>) {
    return httpRequest("get", url, undefined, opt, cfg)
  },

  delete(url: string, opt?: ApiOptions, cfg?: AxiosRequestConfig<any>) {
    return httpRequest("delete", url, undefined, opt, cfg)
  },

  post(url: string, data?: any, opt?: ApiOptions, cfg?: AxiosRequestConfig<any>) {
    return httpRequest("post", url, data, opt, cfg)
  },
}

export type HttpSuccess<T> = {
  result: "success"
  data: T
}

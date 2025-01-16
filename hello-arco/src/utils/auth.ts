import { TokenStorageKey, tokenLocalStorageExpires } from "@/config"

export const isLogin = () => {
  return !!localStorage.getItem(TokenStorageKey)
}

export function getToken(): string | null {
  return getLocalStorage(TokenStorageKey)
}

export function setToken(token: string) {
  return setLocalStorage(TokenStorageKey, token, tokenLocalStorageExpires + "d")
}

export function clearToken() {
  localStorage.removeItem(TokenStorageKey)
}

export function setCookies(name: string, value: string, time: string) {
  const strSec = getSecond(time)
  const exp = new Date()
  exp.setTime(exp.getTime() + strSec * 1)
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString()
}

function getSecond(str: string) {
  const str1 = str.substring(0, str.length - 1)
  const str2 = str.substring(str.length - 1)
  const num1: number = parseInt(str1, 10)
  if (str2 === "s") {
    return num1 * 1000
  } else if (str2 === "m") {
    return num1 * 60 * 1000
  } else if (str2 === "h") {
    return num1 * 60 * 60 * 1000
  } else if (str2 === "d") {
    return num1 * 24 * 60 * 60 * 1000
  } else if (str2 === "M") {
    return num1 * 30 * 24 * 60 * 60 * 1000
  } else {
    return 0
  }
}

// localStorage
export function setLocalStorage(
  key: string,
  value: string | boolean | number | object,
  time = tokenLocalStorageExpires + "d",
) {
  if (time) {
    const strSec = getSecond(time)
    const expires = new Date().getTime() + strSec * 1
    const params = { data: value, expires }
    localStorage.setItem(key, JSON.stringify(params))
  } else {
    const params = { data: value }
    localStorage.setItem(key, JSON.stringify(params))
  }
}

export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key)
  const dataObj = data ? JSON.parse(data) : ""
  if (dataObj && (!dataObj.expires || dataObj.expires - new Date().getTime() > 0)) {
    return dataObj.data
  } else {
    if (dataObj && dataObj.data) {
      localStorage.removeItem(key)
    }
    return ""
  }
}

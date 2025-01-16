import type { Profile } from "@/common/user"
import { http } from "./helper"

export async function login(signInDto: { username: string; password: string }) {
  const { data } = await http.post(`auth/login`, signInDto)
  return data as { access_token: string }
}

export async function getProfile() {
  const { data } = await http.get(`auth/profile`)
  return data as Profile
}

export async function logout() {
  return await http.post(`auth/logout`)
}

export async function getMenuList() {
  return await http.get(`auth/menu-list`)
}

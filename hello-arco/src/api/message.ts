import type { MessageStatus } from "@/common/message"
import { http } from "./helper/http"
export async function queryMessageList() {
  return await http.post("/api/message/list")
}

export async function setMessageStatus(data: MessageStatus) {
  return await http.post("/api/message/read", data)
}

export async function queryChatList() {
  return await http.post("/api/chat/list")
}

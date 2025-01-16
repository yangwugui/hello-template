import * as model from "../common/model"
import { http, type ApiOptions } from "./helper"

export async function create(createDto: model.AccountCreate, opt?: ApiOptions) {
  const res = await http.post(`account/create`, createDto, opt)
  return res.data.id as number
}

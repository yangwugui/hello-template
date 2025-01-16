export * from "./http"
export * from "./mikro-orm-types"

export type Pagination = {
  current: number
  pageSize: number
  total?: number
}

export type PagedList<ListItem extends object> = {
  items: ListItem[]
  total: number
  page?: number
  perPage?: number
}

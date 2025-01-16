export const sysName = "sct3" // 网站标识符

export const TokenStorageKey = `${sysName}Token` // localStorage 存储的key

export const sysBaseOfMobile = `${sysName}-mobile`
export const TokenKeyOfHeader = "auth-token" // 请求头的 key
export const tokenLocalStorageExpires = 1 // 记住密码状态下的token在LocalStorage中存储的天数
export const passLocalStorageExpires = 1 // 记住密码状态下的密码在LocalStorage中存储的天数
export const ThemeKey = `${sysName}-theme` // 主题色 key

export const DictKey = `${sysName}Dict` // localStorage 存储的key
export const TabKey = `${sysName}Tabs` // 记录一打开 tabList的localStorage 存储的key
export const multipleToken = true // 是否保存多个token
export const title = `新诉裁通`
export const timeout = 600000 // 请求超时时间，毫秒（默认2分钟）
export const sysBase = sysName // url base
export const mockEnv = true // 开发环境是否使用mock

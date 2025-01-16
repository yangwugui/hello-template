// 定义系统所使用到的枚举类型

// 最新的 typescript 中可以用下述方法实现枚举类型
export const someNameValue = {
  name: "枚举值",
  // ...
} as const

export type SomeType = keyof typeof someNameValue

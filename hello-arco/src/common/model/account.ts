import { explain } from "../helper"

export class Account {
  id!: number
  name: string | null = null
  pwd!: string
  pwdAlgorithm: string | null = null
  lockType: string | null = null
  pwdErrorTimes: number = 0
  pwdErrorLatestTime: Date | null = null
  aliasName: string | null = null
  mobile: string | null = null
  email: string | null = null
  createdAt?: Date
  updatedAt: Date | null = null
  deletedAt: Date | null = null
  needChangePwd: boolean = false
  lastLogin: Date | null = null
  firstLogin: Date | null = null
  remark: string | null = null
  isEnable: boolean = true
  lockedTime: Date | null = null
}

export const accountExplanation = {
  id: explain("标识", "自增主键"),
  name: explain("账号名称"),
  pwd: explain("密码"),
  pwdAlgorithm: explain("密码加密算法"),
  lockType: explain("账号锁定类型"),
  pwdErrorTimes: explain("密码错误次数"),
  pwdErrorLatestTime: explain("密码错误最后时间"),
  aliasName: explain("别名"),
  mobile: explain("绑定手机号"),
  email: explain("绑定邮箱"),
  needChangePwd: explain("是否强制修改密码"),
  lastLogin: explain("最后登录时间"),
  firstLogin: explain("首次登录时间"),
  isEnable: explain("是否启用"),
  lockedTime: explain("锁定时间"),
  remark: explain("备注"),
  deletedAt: explain("删除时间", "软删除"),
  cratedAt: explain("创建时间", "内部记录执行数据库 Insert 操作的时间"),
  updatedAt: explain("更新时间", "内部记录执行数据库 Update 操作的时间"),
}

export class AccountCreate {
  name: string | null = null
  pwd!: string
  pwdAlgorithm: string | null = null
  aliasName: string | null = null
  mobile: string | null = null
  email: string | null = null
  needChangePwd: boolean = false
  remark: string | null = null
  isEnable: boolean = true
}

export type AccountUpdate = Partial<AccountCreate> & { id: number }

// Mikro-Orm中提供了FilterQuery<T>类型，该类型用于定义查询条件。
// 在原来的定义中考虑了T的如下三种情况：
// 1. T extends Reference<infer U>, 此时可以推断出引用实体类型
// 2. T extends Collection<infer U, any>，此时可以推断出一对多属性集合实体类型
// 3. 以Symbol('PrimaryKeyProp')作为名称的主键属性
// 由于Entity实体类型是在后端使用的，并没有暴露给前端，前端使用的是dto类型，
// 所以改写了FilterQuery<T>类型，去掉了上述可能的类型判断，同时为了避免混淆，把FilterQuery重新命名为FilterCondition。

type InternalKeys =
  | "EntityRepositoryType"
  | "PrimaryKeyProp"
  | "OptionalProps"
  | "EagerProps"
  | "HiddenProps"
  | "__selectedType"
  | "__loadedType"
export type CleanKeys<
  T,
  K extends keyof T,
  B extends boolean = false,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
> = T[K] & {} extends Function
  ? never
  : K extends symbol | InternalKeys
    ? never
    : B extends true
      ? T[K] & {} extends Scalar
        ? never
        : K
      : K

export type EntityKey<T = unknown, B extends boolean = false> = string &
  { [K in keyof T]-?: CleanKeys<T, K, B> extends never ? never : K }[keyof T]

export type Scalar =
  | boolean
  | number
  | string
  | bigint
  | symbol
  | Date
  | RegExp
  | Uint8Array
  | { toHexString(): string }

export type ExpandScalar<T> =
  | null
  | (T extends string
      ? T | RegExp
      : T extends Date
        ? Date | string
        : T extends bigint
          ? bigint | string | number
          : T)

export type OperatorMap<T> = {
  $and?: ExpandQuery<T>[]
  $or?: ExpandQuery<T>[]
  $eq?: ExpandScalar<T> | readonly ExpandScalar<T>[]
  $ne?: ExpandScalar<T>
  $in?: readonly ExpandScalar<T>[]
  $nin?: readonly ExpandScalar<T>[]
  $not?: ExpandQuery<T>
  $none?: ExpandQuery<T>
  $some?: ExpandQuery<T>
  $every?: ExpandQuery<T>
  $gt?: ExpandScalar<T>
  $gte?: ExpandScalar<T>
  $lt?: ExpandScalar<T>
  $lte?: ExpandScalar<T>
  $like?: string
  $re?: string
  $ilike?: string
  $fulltext?: string
  $overlap?: readonly string[] | string | object
  $contains?: readonly string[] | string | object
  $contained?: readonly string[] | string | object
  $exists?: boolean
  $hasKey?: string
  $hasKeys?: readonly string[]
  $hasSomeKeys?: readonly string[]
}

export type FilterItemValue<T> = T | ExpandScalar<T> | Primary<T>
export type FilterValue<T> =
  | OperatorMap<FilterItemValue<T>>
  | FilterItemValue<T>
  | FilterItemValue<T>[]
  | null
export type FilterObject<T> = {
  -readonly [K in EntityKey<T>]?:
    | ExpandQuery<ExpandProperty<T[K]>>
    | FilterValue<ExpandProperty<T[K]>>
    | null
}

// 以下为 Mikro-Orm中的定义类型：
// export type ExpandProperty<T> = T extends Reference<infer U>  /*1*/
//   ? NonNullable<U>
//   : T extends Collection<infer U, any>   /*2*/
//     ? NonNullable<U>
//     : T extends (infer U)[]
//       ? NonNullable<U>
//       : NonNullable<T>;
// 其中：
// 1. 处理了Reference类型的属性，仅包含主键的Entity引用
// 2. 处理了Collection类型的属性，一对多的关联属性
// 去掉上面两种情况后，如下定义类型：
export type ExpandProperty<T> = T extends (infer U)[] ? NonNullable<U> : NonNullable<T>

export type ExpandQuery<T> = T extends object
  ? T extends Scalar
    ? never
    : FilterCondition<T>
  : FilterValue<T>

export type EntityProps<T> = { -readonly [K in EntityKey<T>]?: T[K] }
export type ObjectQuery<T> = OperatorMap<T> & FilterObject<T>
export type FilterCondition<T> =
  | ObjectQuery<T>
  | NonNullable<ExpandScalar<Primary<T>>>
  | NonNullable<EntityProps<T> & OperatorMap<T>>
  | FilterCondition<T>[]

type ReadonlyPrimary<T> = T extends any[] ? Readonly<T> : T
export type IsAny<T> = 0 extends 1 & T ? true : false

// 原来如下：
// export type Primary<T> =
//   IsAny<T> extends true
//     ? any
//     : T extends { [PrimaryKeyProp]?: infer PK }
//       ? PK extends keyof T
//         ? ReadonlyPrimary<UnwrapPrimary<T[PK]>>
//         : PK extends (keyof T)[]
//           ? ReadonlyPrimary<PrimaryPropToType<T, PK>>
//           : PK
//       : T extends { _id?: infer PK }
//         ? ReadonlyPrimary<PK> | string
//         : T extends { uuid?: infer PK }
//           ? ReadonlyPrimary<PK>
//           : T extends { id?: infer PK }
//             ? ReadonlyPrimary<PK>
//             : T;
// 去掉 Symbol('PrimaryKeyProp') 的类型推断后，改写为：
export type Primary<T> =
  IsAny<T> extends true
    ? any
    : T extends { _id?: infer PK }
      ? ReadonlyPrimary<PK> | string
      : T extends { uuid?: infer PK }
        ? ReadonlyPrimary<PK>
        : T extends { id?: infer PK }
          ? ReadonlyPrimary<PK>
          : T

// 去掉 Symbol('PrimaryKeyProp') 后，下述这些类型定义都不再需要：
// export const PrimaryKeyProp = Symbol('PrimaryKeyProp');
//
// export type UnwrapPrimary<T> = T extends Scalar
//   ? T
//   : T extends Reference<infer U>
//     ? Primary<U>
//     : Primary<T>;
//
// type PrimaryPropToType<T, Keys extends (keyof T)[]> = {
//   [Index in keyof Keys]: UnwrapPrimary<T[Keys[Index]]>;
// };

export type SearchCondition<T> = {
  where?: FilterCondition<T> // 默认 {}
  page?: number // 默认1
  perPage?: number // 默认30
  noPaging?: boolean // 默认false
  orderBy?: string // 默认id
  orderDir?: "asc" | "desc" // 默认asc
  orderNull?: "first" | "last" // 默认last
}

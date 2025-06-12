/* eslint-disable @typescript-eslint/no-explicit-any */

export type NotEmptyArray<T> = [T, ...Array<T>];

export type Nil = null | undefined;

export type Falsy = false | Nil | '' | 0 | 0n;

export type Primitive = Nil | boolean | number | bigint | string | symbol;

export type PromiseOrNot<T> = T | Promise<T>;

export type FunctionType<Return = any> = (...args: Array<any>) => Return;

export type FunctionCallback = FunctionType<PromiseOrNot<void>>;

export type ObjectType = Array<unknown> | Record<string, unknown> | FunctionType;

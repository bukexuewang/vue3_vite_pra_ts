declare interface AnyObject {
  [x: string]: any;
}

declare type Func<T = any> = (...args: any[]) => T;

declare type AnyFn<T = any[], R = any> = (...args: T) => R;
// 用来返回函数的参数类型
declare type FnParamType<T> = T extends (...args: infer R) => any ? R : never;

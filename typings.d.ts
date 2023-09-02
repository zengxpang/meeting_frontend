// typings 文件是非全局的（包含了 import/export）
// 这个文件是非全局的，定义了的类型需要 import 才能使用
// 如果需要定义全局声明类型，可以使用 global.d.ts

import '@umijs/max/typings';

declare module 'await-to-js' {
  function to<T, U = any>(
    promise: Promise<T>,
    errorExt?: object,
  ): Promise<[U, undefined] | [null, T]>;
}

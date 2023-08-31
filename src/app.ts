// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { RequestConfig } from '@umijs/max';
import localforage from 'localforage';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

// 与后端约定的响应数据格式
interface ResponseStructure {
  data: any;
  code: number;
  message: string;
  success: boolean;
}

export const request: RequestConfig = {
  timeout: 3000,
  baseURL: '/api',
  requestInterceptors: [
    [
      (url, options) => {
        return { url, options };
      },
      (error) => {
        return Promise.reject(error);
      },
    ],
  ],
  responseInterceptors: [
    [
      (response: any) => {
        return response?.data;
      },
      (error: any) => {
        return Promise.reject(error?.response?.data);
      },
    ],
  ],
};

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'meeting-room',
});

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import {
  RequestConfig,
  RunTimeLayoutConfig,
  history,
  createGlobalStyle,
} from '@umijs/max';
import localforage from 'localforage';
import { Setting } from '@/components';
import { message } from 'antd';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'zxp' };
}

// @ts-ignore
export const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
    menuHeaderRender: undefined,
    fixedHeader: true,
    rightRender: () => {
      return <Setting />;
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
  timeout: 5000,
  baseURL: '/api',
  requestInterceptors: [
    (url, options) => {
      const accessToken = localStorage.getItem('meeting-room/access_token');
      if (accessToken) {
        options.headers.authorization =
          'Bearer ' + accessToken.substring(1, accessToken.length - 1);
      }
      return { url, options };
    },
  ],
  responseInterceptors: [
    [
      (response: any) => {
        return response?.data;
      },
      async (error: any) => {
        const { data } = error.response;
        if (data.code === 401) {
          message.error(data.data);
          history.push('/login');
        }
        return Promise.reject(data);
      },
    ],
  ],
};

export const styledComponents = {
  GlobalStyle: createGlobalStyle``,
};

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'meeting-room',
});

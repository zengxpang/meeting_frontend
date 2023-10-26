import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    // useRequest 就可以直接消费 data
    dataField: 'data',
  },
  layout: {
    title: '会议室预定管理系统',
  },
  plugins: [require.resolve('@umijs/plugins/dist/unocss')],
  unocss: {
    // 检测 className 的文件范围，若项目不包含 src 目录，可使用 `pages/**/*.tsx`
    watch: ['src/**/*.tsx', 'src/**/*.jsx'],
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  routes: [
    {
      path: '/',
      redirect: '/meetingRoomList',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: '注册账号',
      path: '/register',
      component: './Register',
      layout: false,
    },
    {
      name: '忘记密码',
      path: '/updatePassword',
      component: './UpdatePassword',
      layout: false,
    },
    {
      name: '修改信息',
      path: '/updateInfo',
      component: './UpdateInfo',
      hideInMenu: true,
    },
    {
      name: '会议室列表',
      path: '/meetingRoomList',
      component: './MeetingRoomList',
    },
    {
      name: '预定历史',
      path: '/bookedHistory',
      component: './BookedHistory',
    },
  ],
  npmClient: 'pnpm',
});

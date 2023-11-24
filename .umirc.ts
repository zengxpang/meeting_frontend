import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  styledComponents: {},
  request: {},
  layout: {
    title: '会议室预定用户系统',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:30086/',
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
      icon: 'UnorderedListOutlined',
    },
    {
      name: '预定历史',
      path: '/bookedHistory',
      component: './BookedHistory',
      icon: 'HistoryOutlined',
    },
  ],
  npmClient: 'pnpm',
});

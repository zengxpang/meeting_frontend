import { Space } from 'antd';
import React from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';

interface LoginOutProps {}

// 脚手架示例组件
const LoginOut = (props: LoginOutProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // localStorage.removeItem('Auth-Token');
    navigate('/login');
  };

  return (
    <Space onClick={handleClick}>
      <LoginOutlined />
      退出登录
    </Space>
  );
};

export default LoginOut;

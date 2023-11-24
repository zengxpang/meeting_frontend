import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, request } from '@umijs/max';
import to from 'await-to-js';
import { isNull } from 'lodash-es';
import { message } from 'antd';
import localforage from 'localforage';
import { useNavigate, styled } from '@umijs/max';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .ant-pro-form-login-container {
    width: 100%;
    justify-content: center;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

interface ILoginProps {}

const Login = (props: ILoginProps) => {
  const navigate = useNavigate();

  const handleFinish = async (values: {
    username: string;
    password: string;
  }) => {
    const [err, res] = await to(
      request('/user/login', {
        method: 'post',
        data: values,
      }),
    );
    if (isNull(err)) {
      await localforage.setItem('access_token', res.access_token);
      await localforage.setItem('refresh_token', res.refresh_token);
      await localforage.setItem('user_info', res.userInfo);
      message.success('登录成功');
      navigate('/');
    } else {
      message.error(err.data);
    }
  };

  return (
    <Wrap>
      <LoginForm
        title="会议室预定用户系统"
        subTitle="zxp"
        onFinish={handleFinish}
        initialValues={{
          username: 'xun',
          password: '123456',
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        />
        <Footer>
          <Link to="/register">注册账号</Link>
          <Link to="/updatePassword">忘记密码</Link>
        </Footer>
      </LoginForm>
    </Wrap>
  );
};

export default Login;

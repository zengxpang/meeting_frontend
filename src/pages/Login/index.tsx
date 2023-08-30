import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';

interface ILoginProps {}

const Login = (props: ILoginProps) => {
  return (
    <LoginForm title="会议室预定系统" subTitle="zxp">
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
            message: '请输入用户名!',
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
            message: '请输入密码！',
          },
        ]}
      />
      <div className="flex justify-between mb-8px ">
        <Link to="/home">忘记密码</Link>
        <Link to="/register">注册账号</Link>
      </div>
    </LoginForm>
  );
};

export default Login;

import {
  LoginForm,
  ProForm,
  ProFormText,
  ProFormCaptcha,
} from '@ant-design/pro-components';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';

interface IRegisterProps {}

const Register = (props: IRegisterProps) => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="font-600 font-size-33px mb-4">会议室预定系统</div>
      <ProForm layout="horizontal">
        <ProFormText
          fieldProps={{
            size: 'large',
          }}
          width="md"
          name="username"
          label="用户名"
          placeholder={'请输入用户名'}
        />
        <ProFormText
          fieldProps={{
            size: 'large',
          }}
          width="md"
          name="nickname"
          label="昵称"
          placeholder={'请输入昵称'}
        />
        <ProFormText.Password
          fieldProps={{
            size: 'large',
          }}
          width="md"
          name="password"
          label="密码"
          placeholder={'请输入密码'}
        />
        <ProFormText.Password
          fieldProps={{
            size: 'large',
          }}
          width="md"
          name="confirm"
          label="确认密码"
          placeholder={'请再次输入密码'}
        />
        <ProFormText
          fieldProps={{
            size: 'large',
          }}
          width="md"
          name="email"
          label="邮箱"
          placeholder={'请输入邮箱'}
          rules={[{ type: 'email', message: '请输入正确的邮箱地址' }]}
        />
        <ProFormCaptcha
          fieldProps={{
            size: 'large',
          }}
          captchaProps={{
            size: 'large',
          }}
          label="验证码"
          placeholder={'请输入验证码'}
          captchaTextRender={(timing, count) => {
            console.log(timing, count);
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={async () => {
            message.success('获取验证码成功！验证码为：1234');
          }}
        />
      </ProForm>
    </div>
  );
};

export default Register;

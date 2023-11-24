import {
  ProForm,
  ProFormText,
  ProFormCaptcha,
} from '@ant-design/pro-components';
import { message } from 'antd';
import to from 'await-to-js';
import { isNull } from 'lodash-es';
import { history } from '@umijs/max';
import { Link, styled } from '@umijs/max';

import { IRegisterUser, register, registerCaptcha } from '@/services';

const Wrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  margin-bottom: 16px;
  text-align: center;
`;

interface IRegisterProps {}

const Register = (props: IRegisterProps) => {
  const handleFinish = async (
    values: IRegisterUser & {
      confirmPassword: string;
    },
  ) => {
    const { confirmPassword, ...rest } = values;
    const [err, res] = await to(register(rest));
    if (!isNull(err)) {
      message.error(err);
    } else {
      message.success(res);
      history.push('/login');
    }
  };

  const handleGetCaptcha = async (email: string) => {
    const [err, res] = await to(registerCaptcha(email));
    if (!isNull(err)) {
      message.error(err);
    } else {
      message.success(res);
    }
  };

  return (
    <Wrap>
      <ProForm
        layout="vertical"
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            submitText: '注册',
          },
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              width: '100%',
            },
          },
        }}
      >
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          placeholder={'请输入用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="nickName"
          label="昵称"
          placeholder={'请输入昵称'}
          rules={[
            {
              required: true,
              message: '请输入昵称',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="confirmPassword"
          label="确认密码"
          placeholder={'请再次输入密码'}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请再次输入密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                console.log(getFieldValue('password') === value);
                return Promise.reject(new Error('确认密码与密码不匹配!'));
              },
            }),
          ]}
        />
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder={'请输入邮箱'}
          rules={[
            { type: 'email', message: '请输入正确的邮箱地址' },
            {
              required: true,
              message: '请输入邮箱',
            },
          ]}
        />
        <ProFormCaptcha
          label="验证码"
          placeholder={'请输入验证码'}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'获取验证码'}`;
            }
            return '获取验证码';
          }}
          name="captcha"
          phoneName="email"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          onGetCaptcha={handleGetCaptcha}
        />
        <Info>
          已有账号? 去<Link to="/login">登录</Link>
        </Info>
      </ProForm>
    </Wrap>
  );
};

export default Register;

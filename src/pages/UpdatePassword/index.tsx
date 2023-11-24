import {
  ProForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import {
  IUpdatePassword,
  updatePassword,
  updatePasswordCaptcha,
} from '@/services';
import to from 'await-to-js';
import { isNull } from 'lodash-es';
import { message } from 'antd';
import { useNavigate, styled } from '@umijs/max';

const Wrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IUpdatePasswordProps {}

const UpdatePassword = (props: IUpdatePasswordProps) => {
  const navigate = useNavigate();
  const handleFinish = async (
    values: IUpdatePassword & {
      confirmPassword: string;
    },
  ) => {
    const { confirmPassword, ...rest } = values;
    const [err, res] = await to(updatePassword(rest));
    if (isNull(err)) {
      message.success(res);
      navigate('/login');
    } else {
      message.error(err);
    }
  };

  const handleGetCaptcha = async (email: string) => {
    const [err, res] = await to(updatePasswordCaptcha(email));
    console.log(err, res);
    if (isNull(err)) {
      message.success(res);
    } else {
      message.error(err);
    }
  };

  return (
    <Wrap>
      <ProForm
        layout="vertical"
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            submitText: '修改',
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
          name="email"
          label="邮箱"
          placeholder={'请输入邮箱'}
          rules={[
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
      </ProForm>
    </Wrap>
  );
};

UpdatePassword.defaultProps = {};

export default UpdatePassword;

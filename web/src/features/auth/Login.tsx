import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Divider, Form, Input, message } from 'antd'
import { LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useDocumentTitle } from 'usehooks-ts'

import AuthLayout from '~/components/Layouts/AuthLayout'
import { useLoginByEmailMutation } from './store/authService'
import usePersist from '~/hooks/usePersist'
import { EMAIL_REGEX } from '~/config/regex'
import GoogleLogin from './components/GoogleLogin'
import { signInErrorMessages } from './utils/errorMessage'

const Login = () => {
  useDocumentTitle('Login | ChillZone')

  const navigate = useNavigate()

  const [form] = Form.useForm<UserCredentials>()
  const [loginByEmail, { isLoading }] = useLoginByEmailMutation()
  const { persist, setPersist } = usePersist()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const onFinish = async (data: UserCredentials) => {
    try {
      const { email, password } = data
      await loginByEmail({ email, password }).unwrap()
      form.resetFields()
      message.success('Login successfully!')
      navigate('/')
    } catch (error) {
      const errorMessage = signInErrorMessages[(error as ApiError).data.message]
      if (errorMessage) {
        form.setFields([errorMessage])
      } else {
        message.error('No server response. Please try again later ><!')
      }
    }
  }

  return (
    <AuthLayout>
      <p className="mb-2 text-4xl font-bold">Login</p>

      <Form form={form} name="login" size="large" onFinish={onFinish} autoComplete="off" className="min-w-[24rem]">
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email is required.' },
            { pattern: EMAIL_REGEX, message: 'Email is not valid.' }
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" autoComplete="email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Password is required.' }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            autoComplete="current-password"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
        </Form.Item>

        <div className="flex items-center justify-between">
          <Checkbox defaultChecked={persist} onChange={() => setPersist(prev => !prev)} className="mb-4">
            Remember me
          </Checkbox>
        </div>
        <Form.Item>
          <Button className="flex-center" type="primary" ghost htmlType="submit" block disabled={isLoading}>
            {isLoading ? <LoadingOutlined className="flex-center text-lg" /> : 'Login'}
          </Button>
        </Form.Item>

        <Divider plain>or sign in with</Divider>

        <div className="flex w-full items-center justify-between gap-4">
          <GoogleLogin form={form} />
        </div>

        <div className="mt-2 text-base">
          Haven't account yet?{' '}
          <Link to="/signup" className="cursor-pointer font-medium text-primary-5 transition-all hover:border-b">
            Register
          </Link>
        </div>
      </Form>
    </AuthLayout>
  )
}

export default Login

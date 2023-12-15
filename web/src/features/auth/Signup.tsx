import React, { ChangeEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

import AuthLayout from '~/components/Layouts/AuthLayout'
import { useSignupMutation } from './store/authService'
import { EMAIL_REGEX, PWD_REGEX } from '~/config/regex'
import { signUpErrorMessages } from './utils/errorMessage'

type FormData = {
  username: string
  email: string
  password: string
}

type CustomInputPropsType = {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  visible?: boolean
  onVisibleChange?: React.Dispatch<React.SetStateAction<boolean>>
}

const InputUserName = ({ value, onChange }: CustomInputPropsType) => {
  const { status } = Form.Item.useStatus()

  return (
    <Input
      className={status === 'success' ? 'border-polar-green-5' : ''}
      prefix={<UserOutlined className={status === 'success' ? 'text-polar-green-5' : ''} />}
      placeholder="Username"
      value={value}
      onChange={onChange}
      autoComplete="username"
    />
  )
}

const InputEmail = ({ value, onChange }: CustomInputPropsType) => {
  const { status } = Form.Item.useStatus()

  return (
    <Input
      className={status === 'success' ? 'border-polar-green-5' : ''}
      prefix={<MailOutlined className={status === 'success' ? 'text-polar-green-5' : ''} />}
      placeholder="Email"
      value={value}
      onChange={onChange}
      autoComplete="email"
    />
  )
}

const InputPassword = ({ value, onChange, visible, onVisibleChange }: CustomInputPropsType) => {
  const { status } = Form.Item.useStatus()

  return (
    <Input.Password
      className={status === 'success' ? 'border-polar-green-5' : ''}
      prefix={<LockOutlined className={status === 'success' ? 'text-polar-green-5' : ''} />}
      placeholder="Password"
      visibilityToggle={{ visible, onVisibleChange }}
      value={value}
      onChange={onChange}
      autoComplete="current-password"
    />
  )
}

const Signup = () => {
  useDocumentTitle('Register | ChillZone')

  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [signup, { isLoading }] = useSignupMutation()

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const onFinish = async (data: FormData) => {
    try {
      const { email, password, username } = data
      await signup({ email, password, username }).unwrap()
      form.resetFields()
      message.success('Create accout successfully!')
      navigate('/')
    } catch (error) {
      const errorMessage = signUpErrorMessages[(error as ApiError).data.message]
      if (errorMessage) {
        form.setFields([errorMessage])
      } else {
        message.error('No server response. Please try again later ><!')
      }
    }
  }

  return (
    <AuthLayout>
      <p className="mb-2 text-4xl font-bold">Sign up</p>

      <Form form={form} name="register" size="large" autoComplete="off" onFinish={onFinish} className="min-w-[24rem]">
        <Form.Item name="username" rules={[{ required: true, message: 'Username is required.' }]}>
          <InputUserName />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email is required.' },
            { pattern: EMAIL_REGEX, message: 'Email is not valid.' }
          ]}
        >
          <InputEmail />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Password is required.' },
            { pattern: PWD_REGEX, message: 'Password must be between 4-12 characters.' }
          ]}
        >
          <InputPassword visible={passwordVisible} onVisibleChange={setPasswordVisible} />
        </Form.Item>

        <Form.Item>
          <Button className="flex-center" type="primary" ghost htmlType="submit" block>
            {isLoading ? <LoadingOutlined className="flex-center text-lg" /> : 'Create account'}
          </Button>
        </Form.Item>

        <div className="mt-2 text-base">
          Already has account?{' '}
          <Link to="/login" className="cursor-pointer font-medium text-primary-5 transition-all hover:border-b">
            Login
          </Link>
        </div>
      </Form>
    </AuthLayout>
  )
}

export default Signup

import React, { ChangeEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Form, message } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

import AuthLayout from '~/components/Layouts/AuthLayout'
import { useSignupMutation } from './store/authService'
import { EMAIL_REGEX, PWD_REGEX } from '~/config/regex'
import { signUpErrorMessages } from './utils/errorMessage'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Input from '~/components/Input'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Button from '~/components/Button'
import Loading from '~/components/Loading'

type FormData = {
  username: string
  email: string
  password: string
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
    <DefaultLayout>
      <div className="flex-center h-full w-full">
        <Form form={form} className="w-[35rem]" name="register" size="large" autoComplete="off" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Username is required.' }]} initialValue="">
            <Input
              id="username"
              withPrefix={<p className="w-[4rem]">Username</p>}
              maxLength={20}
              placeholder="username"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Email is required.' },
              { pattern: EMAIL_REGEX, message: 'Email is not valid.' }
            ]}
            initialValue=""
          >
            <Input
              id="email"
              withPrefix={<p className="w-[4rem]">Email</p>}
              placeholder="example@gmail.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Password is required.' },
              { pattern: PWD_REGEX, message: 'Password must be between 4-12 characters.' }
            ]}
            initialValue=""
          >
            <Input
              id="password"
              withPrefix={<p className="w-[4rem]">Password</p>}
              lastIcon={passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
              lastIconOnClick={() => setPasswordVisible(prev => !prev)}
              placeholder="secret password"
              type={passwordVisible ? 'text' : 'password'}
            />
          </Form.Item>

          <div className="mb-2 flex w-full items-center justify-end text-text-light dark:text-text-dark">
            <p>
              <Link to="/forgot-password" className="hover:text-primary-5 transition-colors">
                Forgot password ?
              </Link>
            </p>
          </div>

          <Button className="w-full text-lg" type="primary" htmlType="submit">
            {isLoading ? <Loading /> : 'SignUp'}
          </Button>

          <div className="mt-4 text-base text-text-light dark:text-text-dark">
            Already has account?{' '}
            <Link to="/login" className="text-primary-5 cursor-pointer font-medium transition-all hover:border-b">
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </DefaultLayout>
  )
}

export default Signup

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, Divider, Form, message } from 'antd'
import { useDocumentTitle } from 'usehooks-ts'

import AuthLayout from '~/components/Layouts/AuthLayout'
import { useLoginByEmailMutation } from './store/authService'
import usePersist from '~/hooks/usePersist'
import { EMAIL_REGEX } from '~/config/regex'
import GoogleLogin from './components/GoogleLogin'
import { signInErrorMessages } from './utils/errorMessage'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Loading from '~/components/Loading'
import Input from '~/components/Input'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Button from '~/components/Button'

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
    <DefaultLayout>
      <div className="flex-center h-auth-content w-full">
        <Form className="w-[35rem]" form={form} name="login" size="large" onFinish={onFinish} autoComplete="off">
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

          <Form.Item name="password" rules={[{ required: true, message: 'Password is required.' }]} initialValue="">
            <Input
              id="password"
              withPrefix={<p className="w-[4rem]">Password</p>}
              lastIcon={passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
              lastIconOnClick={() => setPasswordVisible(prev => !prev)}
              placeholder="secret password"
              type={passwordVisible ? 'text' : 'password'}
            />
          </Form.Item>

          <div className="mb-2 flex items-center justify-between text-text-light dark:text-text-dark">
            <Checkbox
              defaultChecked={persist}
              onChange={() => setPersist(prev => !prev)}
              className="text-text-light dark:text-text-dark"
            >
              Remember me
            </Checkbox>

            <p>
              <Link to="/forgot-password" className="hover:text-primary-5 transition-colors">
                Forgot password ?
              </Link>
            </p>
          </div>

          <Button className="w-full text-lg" type="primary" htmlType="submit" disabled={isLoading}>
            {isLoading ? <Loading /> : 'Sign In'}
          </Button>

          <Divider plain className="uppercase text-text-light dark:text-text-dark">
            or
          </Divider>

          <GoogleLogin form={form} />

          <div className="mt-4 text-base text-text-light dark:text-text-dark">
            Haven&apos;t account yet?
            <Link to="/signup" className="text-primary-5 ml-2 cursor-pointer font-medium transition-all hover:border-b">
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </DefaultLayout>
  )
}

export default Login

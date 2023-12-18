import React from 'react'
import { useNavigate } from 'react-router-dom'

import Image from '~/components/Image'
import useAuth from '~/hooks/useAuth'
import DefaultAvatar from '~/assets/default-avatar.jpg'
import Button from '~/components/Button'
import { Popover, message } from 'antd'
import { useSendLogoutMutation } from '~/features/auth/store/authService'

const UserButton = () => {
  const navigate = useNavigate()
  const { isUser } = useAuth()

  const [sendLogout] = useSendLogoutMutation()

  const onLogout = async () => {
    try {
      await sendLogout(undefined)
      message.success('Logout successfully!')
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  if (!isUser) return <Button onClick={() => navigate('/login')}>Sign In / Sign Up</Button>

  return (
    <Popover
      placement="bottomRight"
      overlayClassName="bg-drop-down-light dark:bg-drop-down-dark rounded-lg"
      trigger="click"
      color="transparent"
      arrow={false}
      content={
        <div className="flex min-w-[10vw] flex-col items-start justify-start gap-2 p-1 text-base font-medium text-clr-link-light dark:text-clr-link-dark">
          <button type="button" className="cursor-pointer transition-all hover:underline" onClick={onLogout}>
            Logout
          </button>
        </div>
      }
    >
      <div>
        <button className="aspect-square w-10 rounded border-2 border-clr-border-1-dark transition-transform duration-200 hover:translate-y-[-2px]">
          <Image className="rounded" src={DefaultAvatar} />
        </button>
      </div>
    </Popover>
  )
}

export default UserButton

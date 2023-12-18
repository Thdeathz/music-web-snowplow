import React from 'react'
import { IoMailOutline, IoNotificationsOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import IconWrapper from '~/components/IconWrapper'
import UserButton from './UserButton'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-10 flex h-24 items-center justify-between bg-app-light px-6 pb-14 pt-6">
      <button
        className="font-secondary cursor-pointer select-none text-6xl font-semibold uppercase"
        onClick={() => navigate('/')}
      >
        ChillZone
      </button>

      <div className="flex-center gap-3">
        <button className="w-10 p-1 transition-transform duration-200 hover:translate-y-[-2px]">
          <IconWrapper className="text-3xl" icon={<IoMailOutline />} />
        </button>

        <button className="w-10 p-1 transition-transform duration-200 hover:translate-y-[-2px]">
          <IconWrapper className="text-3xl" icon={<IoNotificationsOutline />} />
        </button>

        <UserButton />
      </div>
    </div>
  )
}

export default Header

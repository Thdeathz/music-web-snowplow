import React from 'react'
import { IoMailOutline, IoNotificationsOutline } from 'react-icons/io5'

import DefaultAvatar from '~/assets/default-avatar.jpg'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between px-8 py-6">
      <p className="font-secondary text-6xl font-semibold uppercase ">ChillZone</p>

      <div className="flex-center gap-3">
        <button className="w-10 p-1 transition-transform duration-200 hover:translate-y-[-2px]">
          <IconWrapper className="text-3xl" icon={<IoMailOutline />} />
        </button>

        <button className="w-10 p-1 transition-transform duration-200 hover:translate-y-[-2px]">
          <IconWrapper className="text-3xl" icon={<IoNotificationsOutline />} />
        </button>

        <button className="aspect-square w-10 rounded border-2 border-clr-border-1-dark transition-transform duration-200 hover:translate-y-[-2px]">
          <Image className="rounded" src={DefaultAvatar} />
        </button>
      </div>
    </div>
  )
}

export default Header

import React, { ReactElement } from 'react'
import type { IconType } from 'react-icons'
import { IoMdHeart, IoMdPricetag } from 'react-icons/io'
import { GoHomeFill } from 'react-icons/go'
import { PiMusicNoteFill } from 'react-icons/pi'
import { VscSettings } from 'react-icons/vsc'

import IconWrapper from '../IconWrapper'
import { useLocation, useNavigate } from 'react-router-dom'

type SideItemPropsType = {
  actived?: boolean
  icon: ReactElement<IconType>
  link?: string
}

const SideItem = ({ icon, link }: SideItemPropsType) => {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const actived = currentPath === link || (currentPath === '/' && link === '/')

  const handleClick = () => {
    if (link) {
      navigate(link)
    }
  }

  return (
    <button
      className={`p-2 transition-transform duration-200 hover:translate-x-[-3px] ${actived ? '' : 'opacity-30'}`}
      onClick={handleClick}
    >
      <IconWrapper className="text-3xl" icon={icon} />
    </button>
  )
}

const SideBar = () => {
  return (
    <div className="sticky top-24 flex h-main-content flex-col items-center justify-start gap-16 px-4">
      <SideItem icon={<GoHomeFill />} link="/" />

      <SideItem icon={<IoMdHeart />} />

      <SideItem icon={<PiMusicNoteFill />} />

      <SideItem icon={<VscSettings />} />

      <SideItem icon={<IoMdPricetag />} />
    </div>
  )
}

export default SideBar

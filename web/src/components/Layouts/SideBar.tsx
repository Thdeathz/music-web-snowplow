import React, { ReactElement } from 'react'
import type { IconType } from 'react-icons'
import { IoMdHeart, IoMdPricetag } from 'react-icons/io'
import { GoHomeFill } from 'react-icons/go'
import { PiMusicNoteFill } from 'react-icons/pi'
import { VscSettings } from 'react-icons/vsc'

import IconWrapper from '../IconWrapper'

type SideItemPropsType = {
  actived?: boolean
  icon: ReactElement<IconType>
}

const SideItem = ({ icon, actived = false }: SideItemPropsType) => {
  return (
    <button className={`p-2 transition-transform duration-200 hover:translate-x-[-3px] ${actived ? '' : 'opacity-30'}`}>
      <IconWrapper className="text-3xl" icon={icon} />
    </button>
  )
}

const SideBar = () => {
  return (
    <div className="sticky top-8 flex h-content flex-col items-center justify-start gap-16 px-6">
      <SideItem icon={<GoHomeFill />} actived />

      <SideItem icon={<IoMdHeart />} />

      <SideItem icon={<PiMusicNoteFill />} />

      <SideItem icon={<VscSettings />} />

      <SideItem icon={<IoMdPricetag />} />
    </div>
  )
}

export default SideBar

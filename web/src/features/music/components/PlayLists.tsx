import React from 'react'
import { IoPlayCircleOutline } from 'react-icons/io5'

import DefaultImage from '~/assets/default-avatar.jpg'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'

const PlayListItem = () => {
  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-md">
      <div className="flex items-center justify-start gap-4">
        <Image src={DefaultImage} alt="playlist" className="aspect-square w-24 rounded-md" />

        <div>
          <p className="font-secondary text-5xl font-semibold">Best of Eren</p>
          <p className="text-xl font-medium">32 songs in this list</p>
        </div>
      </div>

      <button>
        <IconWrapper className="text-6xl" icon={<IoPlayCircleOutline />} />
      </button>
    </div>
  )
}

const PlayLists = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <PlayListItem />

      <PlayListItem />
    </div>
  )
}

export default PlayLists

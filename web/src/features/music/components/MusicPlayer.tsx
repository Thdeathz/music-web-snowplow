import React from 'react'

import Player from '~/assets/player.png'
import Tracker from '~/assets/tracker.png'
import Disk from '~/assets/disk.png'

import Image from '~/components/Image'

type PropsType = { isPlaying?: boolean }

const MusicPlayer = ({ isPlaying = false }: PropsType) => {
  return (
    <div className="relative w-min">
      <Image src={Player} className="min-w-[37.5rem] object-contain" />

      <Image
        src={Disk}
        className={`absolute left-[2rem] top-[1.25rem] w-[28rem] object-contain ${
          isPlaying ? 'animate-disk-spin ' : ''
        }`}
      />

      <Image src={Tracker} className="absolute right-7 top-8 w-[12rem] rotate-0 object-contain" />
    </div>
  )
}

export default MusicPlayer

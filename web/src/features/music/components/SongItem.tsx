import React from 'react'
import { IoPlayCircleOutline } from 'react-icons/io5'

import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import Topics from '~/components/Topics'
import usePlaySong from '../hooks/usePlaySong'
import { gridList } from '~/config/variant'

type PropsType = {
  song: IMusic
}

const SongItem = ({ song }: PropsType) => {
  const onPlaySong = usePlaySong(song)

  return (
    <div
      className="card-item pointer-events-auto flex w-full cursor-pointer items-center justify-between rounded-md transition-opacity duration-200 hover:opacity-100"
      onClick={onPlaySong}
    >
      <div className="flex items-center justify-start gap-4">
        <Image src={song.thumbnail} alt="playlist" className="aspect-square w-32 rounded-md object-cover" />

        <div>
          <p className="font-secondary text-5xl font-semibold">{song.title}</p>
          <Topics topics={song.topics} />
        </div>
      </div>

      <button>
        <IconWrapper className="text-6xl" icon={<IoPlayCircleOutline />} />
      </button>
    </div>
  )
}

export default SongItem

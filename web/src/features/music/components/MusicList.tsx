import React from 'react'

import Image from '~/components/Image'
import { useGetMusicQuery } from '../store/musicService'
import Loading from '~/components/Loading'
import { useNavigate } from 'react-router-dom'

type MusicItemPropsType = {
  music: IMusic
}

const MusicItem = ({ music }: MusicItemPropsType) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(
      `?${new URLSearchParams({
        play: music.id
      })}`
    )
  }

  return (
    <div
      className="group z-30 flex h-full min-w-[15rem] cursor-pointer select-none flex-col items-center justify-start overflow-y-visible transition-transform duration-200 hover:translate-y-[-6px]"
      onClick={onClick}
    >
      <Image
        src={music.thumbnail}
        className="h-0 grow rounded-md object-cover shadow-md transition-shadow duration-200 group-hover:shadow-xl"
      />

      <div className="text-center">
        <p className="font-secondary w-[15rem] truncate px-2 text-3xl font-semibold">{music.title}</p>
        <p className="cursor-pointer text-base underline">by {music.artist.name}</p>
      </div>
    </div>
  )
}

const MusicList = () => {
  const { data: musics, isLoading } = useGetMusicQuery({ page: 1 })

  if (isLoading || !musics) return <Loading className="text-3xl" />

  return (
    <div className="hidden-scroll-bar flex h-0 w-full grow items-center justify-start gap-2 overflow-x-auto">
      {musics.data.map(each => (
        <MusicItem key={`music-${each.id}`} music={each} />
      ))}
    </div>
  )
}

export default MusicList

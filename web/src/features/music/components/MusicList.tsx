import React from 'react'

import Image from '~/components/Image'
import { useGetMusicQuery } from '../store/musicService'
import Loading from '~/components/Loading'
import { useNavigate } from 'react-router-dom'
import { trackSelfDescribingEvent } from '@snowplow/browser-tracker'
import { selectCurrentFilterTopic } from '../store/musicSlice'
import { useAppSelector } from '~/hooks/useRedux'
import useAuth from '~/hooks/useAuth'
import usePlaySong from '../hooks/usePlaySong'

type MusicItemPropsType = {
  music: IMusic
}

const MusicItem = ({ music }: MusicItemPropsType) => {
  const navigate = useNavigate()
  const { userId, username } = useAuth()

  const onPlaySong = usePlaySong(music)

  const onSelectArtist = () => {
    trackSelfDescribingEvent({
      event: {
        schema: 'iglu:com.chillzone/filter_artist/jsonschema/1-0-0',
        data: {
          user_id: userId,
          username,
          artist_id: music.artist.id,
          artist_name: music.artist.name
        }
      }
    })

    navigate(`/${music.artist.id}`)
  }

  return (
    <div className="group z-30 flex h-full flex-col items-center justify-start">
      <div
        className="group flex h-0 min-w-[15rem] shrink grow cursor-pointer select-none flex-col items-center justify-start overflow-y-visible transition-transform duration-200 hover:translate-y-[-6px]"
        onClick={onPlaySong}
      >
        <Image
          src={music.thumbnail}
          className="h-0 grow rounded-md object-cover shadow-md transition-shadow duration-200 group-hover:shadow-xl"
        />

        <div className="text-center">
          <p className="font-secondary w-[15rem] truncate px-2 text-3xl font-semibold">{music.title}</p>
        </div>
      </div>

      <button
        className="cursor-pointer p-1 text-base underline transition-all duration-200 hover:translate-y-[-3px] hover:text-input-glory-light"
        onClick={onSelectArtist}
      >
        by {music.artist.name}
      </button>
    </div>
  )
}

const MusicList = () => {
  const filterTopic = useAppSelector(selectCurrentFilterTopic)
  const { data: musics, isLoading } = useGetMusicQuery({
    page: 1,
    topic: filterTopic === 'All' ? '' : filterTopic
  })

  if (isLoading || !musics) return <Loading className="text-3xl" />

  return (
    <div className="hidden-scroll-bar flex h-0 w-full grow items-center justify-start gap-2 overflow-x-auto pt-4">
      {musics.data.map(each => (
        <MusicItem key={`music-${each.id}`} music={each} />
      ))}
    </div>
  )
}

export default MusicList

import React from 'react'
import { IoMdHeart } from 'react-icons/io'
import {
  IoPauseCircleSharp,
  IoPlaySkipBackOutline,
  IoPlaySkipForwardOutline,
  IoRepeatOutline,
  IoShuffle
} from 'react-icons/io5'

import IconWrapper from '~/components/IconWrapper'
import { useGetMusicByIdQuery } from '../store/musicService'
import Loading from '~/components/Loading'
import { useEffectOnce } from 'usehooks-ts'
import { trackPageView } from '@snowplow/browser-tracker'
import { useLocationChange } from '~/app/tracker'

type PropsType = {
  musicId: string
}

const PlayMusicControl = ({ musicId }: PropsType) => {
  const { data: music, isLoading, isFetching } = useGetMusicByIdQuery(musicId)

  useLocationChange()

  useEffectOnce(() => {
    if (music) {
      trackPageView({
        title: document.title
      })
    }
  })

  if (isLoading || isFetching || !music) return <Loading className="text-3xl" />

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="font-secondary truncate px-2 text-6xl font-semibold">{music.title}</p>

          <div className="flex-center gap-2">
            <IconWrapper className="text-5xl" icon={<IoMdHeart />} />
            <p className="font-secondary text-6xl font-semibold">152</p>
          </div>
        </div>

        <div className="flex items-center justify-start gap-2">
          {music.topics.slice(0, 2).map(topic => (
            <div
              key={`topic-${topic.id}`}
              className="font-secondary w-min whitespace-nowrap rounded-full border-2 border-clr-link-light bg-clr-link-light px-5 text-3xl font-semibold leading-6 text-white"
            >
              {topic.name}
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-between text-2xl font-medium">
        <p className="">1:54</p>

        <p className="">3:35</p>
      </div>

      <div className="flex w-full items-center justify-center gap-6">
        <IconWrapper className="text-3xl" icon={<IoRepeatOutline />} />

        <IconWrapper className="text-3xl" icon={<IoPlaySkipBackOutline />} />

        <IconWrapper className="text-8xl" icon={<IoPauseCircleSharp />} />

        <IconWrapper className="text-3xl" icon={<IoPlaySkipForwardOutline />} />

        <IconWrapper className="text-3xl" icon={<IoShuffle />} />
      </div>
    </>
  )
}

export default PlayMusicControl

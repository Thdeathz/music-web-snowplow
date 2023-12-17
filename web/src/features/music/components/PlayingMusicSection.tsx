import React from 'react'
import { useSearchParams } from 'react-router-dom'

import MusicPlayer from './MusicPlayer'
import PlayMusicControl from './PlayMusicControl'

const PlayingMusicSection = () => {
  const [searchParams] = useSearchParams()
  const musicId = searchParams.get('play')

  return (
    <div className="flex h-full max-h-content flex-col items-center justify-center gap-12 overflow-hidden">
      <MusicPlayer isPlaying={!!musicId} />

      <div className="flex h-full w-full grow flex-col items-center justify-between pb-12">
        {musicId ? (
          <PlayMusicControl musicId={musicId} />
        ) : (
          <p className="font-secondary pt-16 text-6xl font-semibold opacity-30">Please select a song</p>
        )}
      </div>
    </div>
  )
}

export default PlayingMusicSection

import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import MusicPlayer from './MusicPlayer'
import PlayMusicControl from './PlayMusicControl'
import { defaultVariant } from '~/config/variant'

const PlayingMusicSection = () => {
  const [searchParams] = useSearchParams()
  const musicId = searchParams.get('play')

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 overflow-hidden">
      <MusicPlayer isPlaying={!!musicId} />

      <div className="h-full w-full grow pb-10">
        {musicId ? (
          <PlayMusicControl musicId={musicId} />
        ) : (
          <motion.p
            className="font-secondary pt-16 text-center text-6xl font-semibold opacity-30"
            variants={defaultVariant}
            initial="hidden"
            animate="enter"
            exit="exit"
          >
            Please select a song
          </motion.p>
        )}
      </div>
    </div>
  )
}

export default PlayingMusicSection

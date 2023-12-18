import React from 'react'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import MusicListSection from './components/MusicListSection'
import PlayingMusicSection from './components/PlayingMusicSection'
import { isTrackerInitialized } from '~/app/tracker'

const Home = () => {
  return (
    <DefaultLayout>
      <MusicListSection />
    </DefaultLayout>
  )
}

export default Home

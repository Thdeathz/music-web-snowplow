import React from 'react'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import MusicListSection from './components/MusicListSection'
import PlayingMusicSection from './components/PlayingMusicSection'
import { isTrackerInitialized } from '~/app/tracker'

const Home = () => {
  return (
    <DefaultLayout>
      <div className="flex h-content w-full items-center justify-center gap-16">
        <>{console.log('==> data', isTrackerInitialized())}</>
        <div className="sticky top-8 h-full max-w-[40rem] basis-5/12">
          <PlayingMusicSection />
        </div>

        <div className="h-full w-0 shrink grow basis-7/12">
          <MusicListSection />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Home

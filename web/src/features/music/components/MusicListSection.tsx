import React from 'react'
import SectionHeader from './SectionHeader'
import FilterBar from './FilterBar'
import MusicList from './MusicList'
import PlayLists from './PlayLists'

const MusicListSection = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start">
      <div className="flex min-h-[55vh] w-full basis-7/12 flex-col items-start justify-start gap-4 text-8xl">
        <SectionHeader title="Music Categories" titleSize="text-[5rem] leading-[4rem]" />

        <FilterBar />

        <MusicList />
      </div>

      <div className="mt-4 w-full basis-5/12">
        <SectionHeader title="Favorite Playlists" />

        <PlayLists />
      </div>
    </div>
  )
}

export default MusicListSection

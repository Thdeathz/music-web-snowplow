import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import SectionHeader from '~/components/SectionHeader'
import { useGetMusicByArtistQuery } from './store/musicService'
import Loading from '~/components/Loading'
import { useDocumentTitle } from 'usehooks-ts'
import SongItem from './components/SongItem'
import { gridList } from '~/config/variant'

const Artist = () => {
  const { artistId } = useParams()
  const { data, isLoading, isError } = useGetMusicByArtistQuery(artistId as string)

  useDocumentTitle(data ? `${data.name} | ChillZone` : 'ChillZone')

  if (isLoading || !data) {
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    )
  }

  return (
    <DefaultLayout>
      <SectionHeader title={data.name} titleSize="text-8xl" type="detail" />

      <div className="card-list pointer-events-none flex flex-col items-start justify-start gap-4 transition-opacity">
        {data.musics.map(music => (
          <SongItem key={music.id} song={music} />
        ))}
      </div>
    </DefaultLayout>
  )
}

export default Artist

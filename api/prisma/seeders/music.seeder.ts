import { Artist, Music, Topic } from '@prisma/client'

import { musicFactory } from '../factories/music.factory'
import prisma from './prisma-client'

const musicSeeder = async (topics: Topic[], artists: Artist[]): Promise<Music[]> => {
  console.log('🌱 Seeding musics...')
  let musics: Music[] = []
  const musicsData = await musicFactory(topics, artists)

  await Promise.all(
    musicsData.map(async each => {
      const newMusic = await prisma.music.create({
        data: {
          title: each.title,
          thumbnail: each.thumbnail,
          duration: each.duration,
          url: each.url,
          artist: {
            connect: {
              id: each.artist.id
            }
          },
          topics: {
            connect: each.topics.map(topic => ({ id: topic.id }))
          }
        }
      })

      musics.push(newMusic)
    })
  )

  console.log('🌱 Seeding musics completed!')

  return musics
}

export default musicSeeder

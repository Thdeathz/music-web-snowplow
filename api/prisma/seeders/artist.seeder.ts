import { Artist } from '@prisma/client'

import { artistFactory } from '../factories/artist.factory'
import prisma from './prisma-client'

const artistSeeder = async (): Promise<Artist[]> => {
  console.log('🌱 Seeding artists...')
  let artists: Artist[] = []
  const artistsData = await artistFactory()

  await Promise.all(
    artistsData.map(async each => {
      const newArtist = await prisma.artist.create({
        data: {
          name: each.name
        }
      })

      artists.push(newArtist)
    })
  )

  console.log('🌱 Seeding artists completed!')

  return artists
}

export default artistSeeder

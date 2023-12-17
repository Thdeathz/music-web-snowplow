import { faker } from '@faker-js/faker'
import { Artist, Topic } from '@prisma/client'

type MusicFactory = {
  title: string
  thumbnail: string
  duration: number
  url: string
  artist: Artist
  topics: Topic[]
}

export const musicFactory = async (topics: Topic[], artists: Artist[]) => {
  let musics: MusicFactory[] = []

  const titles = faker.helpers.uniqueArray(faker.definitions.music.song_name, 50)

  titles.map(async title => {
    const thumbnail = faker.image.url()
    const duration = faker.number.int({ min: 200, max: 500 })
    const url = faker.internet.url()
    const artist = faker.helpers.arrayElement(artists)
    const musicTopics = faker.helpers.arrayElements(topics, { min: 1, max: 3 })

    musics.push({
      title,
      thumbnail,
      duration,
      url,
      artist,
      topics: musicTopics
    })
  })

  return musics
}

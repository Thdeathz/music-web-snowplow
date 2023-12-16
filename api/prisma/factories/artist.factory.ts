import { faker } from '@faker-js/faker'

type ArtistFactory = {
  name: string
}

export const artistFactory = async () => {
  let artists: ArtistFactory[] = []

  Array.from(Array(10)).map(async () => {
    const name = faker.person.lastName()

    artists.push({
      name
    })
  })

  return artists
}

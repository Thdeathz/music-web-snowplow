import { faker } from '@faker-js/faker'

type ArtistFactory = {
  name: string
}

export const artistFactory = async () => {
  const names = faker.helpers.uniqueArray(faker.definitions.person.last_name, 10)

  const artists: ArtistFactory[] = names.map(each => ({ name: each }))

  return artists
}

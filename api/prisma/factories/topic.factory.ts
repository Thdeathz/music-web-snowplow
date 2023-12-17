import { faker } from '@faker-js/faker'

type TopicFactory = {
  name: string
}

export const topicFactory = async () => {
  const names = faker.helpers.uniqueArray(faker.definitions.music.genre, 10)

  const topics: TopicFactory[] = names.map(each => ({ name: each }))

  return topics
}

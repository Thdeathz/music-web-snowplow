import { faker } from '@faker-js/faker'

type TopicFactory = {
  name: string
}

export const topicFactory = async () => {
  let topics: TopicFactory[] = []

  Array.from(Array(10)).map(async () => {
    const name = faker.music.genre()

    topics.push({
      name
    })
  })

  return topics
}

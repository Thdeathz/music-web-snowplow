import { Topic } from '@prisma/client'

import { topicFactory } from '../factories/topic.factory'
import prisma from './prisma-client'

const topicSeeder = async (): Promise<Topic[]> => {
  console.log('🌱 Seeding topics...')
  let topics: Topic[] = []
  const topicsData = await topicFactory()

  await Promise.all(
    topicsData.map(async each => {
      const newTopic = await prisma.topic.create({
        data: {
          name: each.name
        }
      })

      topics.push(newTopic)
    })
  )

  console.log('🌱 Seeding topics completed!')

  return topics
}

export default topicSeeder

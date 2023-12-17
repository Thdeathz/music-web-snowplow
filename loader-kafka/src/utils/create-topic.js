import { Kafka } from 'kafkajs'
import { brokers, kafka } from './brokers.js'
import { topics } from './topic.js'

const admin = kafka.admin()
const createTopic = async () => {
  try {
    await admin.connect()
    await admin.createTopics({
      topics
    })

    console.log('Topics created')
  } catch {
    console.error()
  }
  // disconect fron kafka cluster
}

export { createTopic }

import { kafka } from './brokers.js'
import { topics } from './topic.js'
import { Mongoose } from 'mongoose'

const url = 'localhost '

const consumer = kafka.consumer({
  groupId: 'kafka'
})

export const consumerReceiving = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: topics[0], fromBeginning: true })
  // await consumer.subscribe({ topic: topics[1], fromBeginning: true })
  // await consumer.subscribe({ topic: topics[2], fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      })
    }
  })
}

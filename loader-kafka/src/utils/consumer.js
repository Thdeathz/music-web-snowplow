import { kafka } from './brokers.js'
import { topics } from './topic.js'
import mongoose, { Mongoose } from 'mongoose'
import Event from '../models/Event.js'

const url = 'localhost '

const consumer = kafka.consumer({
  groupId: 'kafka'
})

export const consumerReceiving = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'listen', fromBeginning: true })
  // await consumer.subscribe({ topic: topics[1], fromBeginning: true })
  // await consumer.subscribe({ topic: topics[2], fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      const data = JSON.parse(message.value.toString())

      try {
        await Event.create({
          userId: data.contexts.user_id,
          userName: data.contexts.username,
          eventName: data.event_name,
          songId: data.contexts.song_id,
          songTitle: data.contexts.song_title,
          artistName: data.contexts.artist_name,
          topicList: data.contexts.topics_list,
          time: data.time,
          topicId: data.contexts.topic_id,
          topicName: data.contexts.topic_name
        })
      } catch (error) {
        console.log('Thêm dữ liệu vào mongodb thất bại', error.message)
      }
    }
  })
}

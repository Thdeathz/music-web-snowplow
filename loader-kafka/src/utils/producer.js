import { Kafka, Partitioners } from 'kafkajs'
import { kafka } from './brokers.js'
import { topics } from './topic.js'
import axios from 'axios'
import request from 'request'

const apiUrl = 'http://snowplow:9090/micro/good'

const map = new Map()

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
})

const fetchDataFromAPI = async () => {
  return new Promise(async (reject, resolve) => {
    await fetch(apiUrl, (error, response, body) => {
      if (error) {
        console.error('Error fetching data from API:', error.message)
        reject(error)
      }
      console.log(JSON.parse(body))
      resolve(body)
    })
  })
}

const producerSending = async () => {
  // connecting
  await producer.connect()

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      data.map(event => {
        if (map.has(event.event.event_id)) {
          return null
        }

        map.set(event.event.event_id, true)

        const play_music_event = {
          event_id: event.event.event_id,
          user_id: event.domain_userid,
          event_name: event.event.event_name,
          contexts: event.event.unstruct_event.data.data,
          time: event.rawEvent.context.timestamp
        }

        producer.send({
          topic: 'listen',
          messages: [{ value: JSON.stringify(play_music_event) }]
        })

        console.log('Send event to listen topic')
      })
    })
}

const running = async () => {
  setInterval(producerSending, 5000) // Lấy dữ liệu mỗi 5 giây (thay đổi theo nhu cầu)
  await producer.disconnect()
}

export { fetchDataFromAPI, producerSending, running }

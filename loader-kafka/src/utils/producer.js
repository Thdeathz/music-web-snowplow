import { Kafka, Partitioners } from 'kafkajs'
import { kafka } from './brokers.js'
import { topics } from './topic.js'
import axios from 'axios'
import request from 'request'

const apiUrl = 'http://snowplow:9090/micro/good'

const lastdata = 0
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
  const data = await fetch(apiUrl)

  // console.log(data)
  // send new
  // if (data.length > lastdata) {
  //   const newData = dataArray.slice(lastdata)
  data.forEach(element => {
    const play_music_event = {
      event_id: element.event.event_id,
      user_id: element.domain_userid,
      even_name: element.event.event_name,
      contexts: element.event.unstruct_event.data.data,
      time: element.raw_event.context.timestamp
    }
    console.log(play_music_event)

    if (element.event.event_name == 'play_music') {
      producer.send({
        topic: 'listen',
        messages: [{ value: play_music_event }]
      })

      console.log(element)
    } else if (element.event.event_name) {
      producer.send({
        topic: 'view',
        messages: [{ value: play_music_event }]
      })
    } else {
      producer.send({
        topic: 'search',
        messages: [{ value: play_music_event }]
      })
    }
  })

  lastdata = data.length
  // } else {
  //   console.log('No new data.')
  // }
}

const running = async () => {
  // await producer.connect()

  setInterval(fetchDataAndProduce, 5000) // Lấy dữ liệu mỗi 5 giây (thay đổi theo nhu cầu)

  await producer.disconnect()
}

export { fetchDataFromAPI, producerSending, running }

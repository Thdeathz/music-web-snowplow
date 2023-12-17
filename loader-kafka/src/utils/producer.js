import { Kafka, Partitioners } from 'kafkajs'
import { kafka } from './brokers.js'
import { topics } from './topic.js'
import axios from 'axios'
import request from 'request'

const apiUrl = 'http://snowplow.localhost:3000/micro/good'

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
})

const fetchDataFromAPI = async () => {
  try {
    const response = await axios.get(apiUrl)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Error fetching data from API:')
  }
}

const producerSending = async () => {
  // connecting
  await producer.connect()
  const data = fetchDataFromAPI()

  // send message
  await producer.send({
    topic: topics[0],
    messages: [{ value: JSON.stringify(dataFromAPI) }]
  })
  console.log('message sent')
}

export { fetchDataFromAPI, producerSending }

import {Kafka,Partitioners} from "kafkajs"
import { kafka } from "./brokers.js"
import { topics } from "./topic.js"
import axios from "axios"

const apiUrl = "http://snowplow.localhost:5000/micro/good" 


const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
})

const fetchDataFromAPI = async () => {
    try { 
      const response = await fetch(apiUrl);
      console.log( response.data)
      return response.data; // Điều này giả sử dữ liệu của API trả về là dạng JSON 
    } catch (error) {
      console.error('Error fetching data from API:', error.message);
      throw error;
    }
  };

const producerSending = async() =>{
    // connecting
    await producer.connect()
    const data = fetchDataFromAPI()



    // send message
    await producer.send({
        topic: topics[0],
        messages:[
            {value: JSON.stringify(dataFromAPI)},
        ]
    })
console.log('message sent')
}

export {fetchDataFromAPI, producerSending}   
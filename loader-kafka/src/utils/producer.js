import {Kafka,Partitioners} from "kafkajs"
import { kafka } from "./brokers.js"
import { topics } from "./topic.js"


const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
})

export const producerSending = async() =>{
    // connecting
    await producer.connect()

    // send message
    await producer.send({
        topic: topics[0],
        messages:[
            {value: 'this is the first message'},
        ]
    })
console.log('message sent')
}
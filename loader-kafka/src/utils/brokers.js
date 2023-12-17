import { Kafka, Partitioners } from 'kafkajs'

const brokers = ['localhost:9092']

const kafka = new Kafka({
  clientId: 'chillzone',
  brokers: brokers, // You can add more hosts here if needed
  partitioner: Partitioners.LegacyPartitioner // Example of using the partitioner, adjust as needed
})

export { kafka, brokers }

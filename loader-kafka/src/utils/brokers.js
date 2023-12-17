import { Kafka, Partitioners } from 'kafkajs';

const brokers = ['127.0.0.1:9092'];

const kafka = new Kafka({
    clientId: 'chillzone',
    brokers: brokers, // You can add more hosts here if needed
    partitioner: Partitioners.LegacyPartitioner // Example of using the partitioner, adjust as needed
});

export {kafka, brokers}
const { Kafka } = require('kafkajs')
require('dotenv').config({ path: '.env.local' });

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'task-service',
    brokers: [process.env.KAFKA_BROKERS],

})
export const producer = kafka.producer;

export const sendToKafka = async (topic, message) => {
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }]
    })
    await producer.disconnect();
}

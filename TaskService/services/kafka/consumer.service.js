const { Kafka } = require('kafkajs');
const { logger } = require('../logger.service')
require('dotenv').config({ path: '.env.local' });

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'task-service',
    brokers: [process.env.KAFKA_BROKERS],
});

const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID || 'task-group'
})

const runConsumer = async () => {
    try {
        // Connect to Kafka
        await consumer.connect();
        logger.info("Successfully connected Consumer to Kafka");
        await consumer.subscribe({ topic: process.env.TASK_CREATED, fromBeginning: true });
        await consumer.subscribe({ topic: process.env.TASK_UPDATED, fromBeginning: true });
        await consumer.subscribe({ topic: process.env.TASK_DELETED, fromBeginning: true });

        logger.info("Successfully subscribed to topics");

        // Start consuming messages
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const data = JSON.parse(message.value.toString());
                switch (topic) {
                    case process.env.TASK_CREATED:
                        logger.debug(`Task created: ${data}`);
                        // Handle new task creation logic here
                        break;
                    case process.env.TASK_UPDATED:
                        logger.debug(`Task updated: ${data}`);
                        // Handle task update logic here
                        break;
                    case process.env.TASK_DELETED:
                        logger.debug(`Task deleted: ${data.id}`);
                        // Handle task deletion logic and clean up comments if needed
                        break;
                    default:
                        logger.debug(`Unknown topic: ${topic}`);
                }
            },
        });

    } catch (e) {
        logger.error("Something went wrong while setting up the Kafka consumer: ", e);
    }
}

module.exports={runConsumer}
const { Kafka } = require('kafkajs');
const { logger } = require("../services/logger.service");
require('dotenv').config({ path: '.env.local' });

const kafka = new Kafka({
    clientId: 'comment-service',
    brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({
    groupId: 'comment-group',
});

const runConsumer = async () => {
    try {
        // Connect to Kafka
        await consumer.connect();
        logger.info("Successfully connected Consumer to Kafka");

        await consumer.subscribe({ topic: process.env.COMMENT_ADDED_TOPIC, fromBeginning: true });
        await consumer.subscribe({ topic: process.env.COMMENT_UPDATED_TOPIC, fromBeginning: true });
        await consumer.subscribe({ topic: process.env.COMMENT_DELETED_TOPIC, fromBeginning: true });

        logger.info("Successfully subscribed to topics");

        // Start consuming messages
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const data = JSON.parse(message.value.toString());
                switch (topic) {
                    case process.env.TASK_CREATED_TOPIC:
                        console.log(`Task created: ${data}`);
                        // Handle new task creation logic here
                        break;
                    case process.env.TASK_UPDATED_TOPIC:
                        console.log(`Task updated: ${data}`);
                        // Handle task update logic here
                        break;
                    case process.env.TASK_DELETED_TOPIC:
                        console.log(`Task deleted: ${data.id}`);
                        // Handle task deletion logic and clean up comments if needed
                        break;
                    case process.env.COMMENT_ADDED_TOPIC:
                        console.log(`Comment added: ${data}`);
                        // Handle new comment logic here
                        break;
                    case process.env.COMMENT_UPDATED_TOPIC:
                        console.log(`Comment updated: ${data}`);
                        // Handle comment update logic here
                        break;
                    case process.env.COMMENT_DELETED_TOPIC:
                        console.log(`Comment deleted: ${data.id}`);
                        // Handle comment deletion logic here
                        break;
                    default:
                        console.log(`Unknown topic: ${topic}`);
                }
            },
        });

    } catch (e) {
        logger.error("Something went wrong while setting up the Kafka consumer: ", e);
    }
}

module.exports = runConsumer;

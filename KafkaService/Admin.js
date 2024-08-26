const { Kafka } = require('kafkajs')
require('dotenv').config({ path: '.env.local' });
const { logger } = require('./logging.service')
const { extractTopics } = require('./utilities/helperFunctions')
const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER]
})
const admin = kafka.admin()

const createTopics = async () => {
    try {
        await admin.connect();
        logger.info("Successfully connected Admin to Kafka");
    } catch (e) {
        logger.error("Something Went Wrong While Connecting Comment Admin", e);
    }


    try {
        logger.info("Fetching Topics from Kafka");
        const topics = await admin.listTopics();
        logger.debug("Topic Fetched Successfully  ");
        console.log(`Topics : ${JSON.stringify(topics)}`);

        if (!topics?.length) {
            const allTopics = extractTopics();
            console.log("All topics : ", allTopics);

            // Filter topics that don't already exist
            const topicsToCreate = allTopics
                .filter(topic => !topics.includes(topic))
                .map(topic => ({
                    topic,
                    numPartitions: 2, // Default partition number, adjust if needed
                    replicationFactor: 1 // Adjust replication factor as needed
                }));

            if (topicsToCreate.length) {
                console.log("Topics : to create : ", topicsToCreate);

                await admin.createTopics({
                    waitForLeaders: true,
                    topics: topicsToCreate
                });
                logger.info("New topics created successfully");
            } else {
                logger.info("No new topics to create");
            }

            // await admin.createTopics({
            //     waitForLeaders: true,
            //     topics: [
            //         { topic: process.env.COMMENT_ADDED_TOPIC, fromBeginning: true, numPartitions: 2 },
            //         { topic: process.env.COMMENT_UPDATED_TOPIC, fromBeginning: true, numPartitions: 2 },
            //         { topic: process.env.COMMENT_DELETED_TOPIC, fromBeginning: true, numPartitions: 2 },

            //         { topic: process.env.TASK_UPDATED_TOPIC, fromBeginning: true, numPartitions: 2 },
            //         { topic: process.env.TASK_CREATED_TOPIC, fromBeginning: true, numPartitions: 2 },
            //         { topic: process.env.TASK_DELETED_TOPIC, fromBeginning: true, numPartitions: 2 },
            //     ]
            // })
        }

    } catch (e) {
        logger.error("Something Went Wrong While  Creating Topics", e);
    }

    try {
        await admin.disconnect();
        logger.info("Successfully Dis-connected Admin ");
    } catch (e) {
        logger.error("Something Went Wrong While Dis-Connecting Comment Admin", e);
    }
}

module.exports = createTopics;
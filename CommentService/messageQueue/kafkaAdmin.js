const {Kafka} = require('kafkajs');
const {logger} = require("../services/logger.service");
const e = require("express");
require('dotenv').config({path: '.env.local'});

const kafka = new Kafka({
    clientId: 'comment-service',
    brokers: [process.env.KAFKA_BROKER],
})

const admin = kafka.admin()
const manageTopic = async () => {
    try {
        await admin.connect();
        logger.info("Successfully connected Admin to Kafka");
    } catch (e) {
        logger.error("Something Went Wrong While Connecting Comment Admin", e);
    }

    try {
        await admin.createTopics({
            topics: [
                {topic: process.env.COMMENT_ADDED_TOPIC, fromBeginning: true, numPartitions: 1},
                {topic: process.env.COMMENT_UPDATED_TOPIC, fromBeginning: true, numPartitions: 1},
                {topic: process.env.COMMENT_DELETED_TOPIC, fromBeginning: true, numPartitions: 1},
            ]
        })
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
module.exports = manageTopic
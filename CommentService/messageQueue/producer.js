const {Kafka} = require('kafkajs')
require('dotenv').config({path: '.env.local'});

const kafka = new Kafka({
    clientId: 'comment-service',
    brokers: [process.env.KAFKA_BROKER],
});
const producer = kafka.producer()

const sendMessage = async (topic, message) => {
    await producer.connect();
    await producer.send({
        topic: process.env[`${topic}_TOPIC`],
        messages: [{value: JSON.stringify(message)}]
    })
    await producer.disconnect();

}


module.exports = {  
    sendCommentAdded: (comment) => sendMessage('COMMENT_ADDED', comment),
    sendCommentUpdated: (comment) => sendMessage('COMMENT_UPDATED', comment),
    sendCommentDeleted: (commentId) => sendMessage('COMMENT_DELETED', {id: commentId}),
};
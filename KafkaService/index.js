const createTopics = require("./Admin");
const {logger} = require("./logging.service");
const express = require("express");
const app = express();
require('dotenv').config({path: '.env.local'});

createTopics().then(() => {
    logger.info('Kafka topics managed successfully');
}).catch(err => {
    logger.error('Error managing Kafka topics:', err);
});

app.listen(process.env.PORT, () => {
    logger.info(`Server running on port ${process.env.PORT}`);
})
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { logger, morganMiddleware } = require('./services/logger.service');
require('dotenv').config({ path: '.env.local' });
const consumerService = require('./services/kafka/consumer.service')

const app = express();
const routes = require('./route/index.route');

// Middleware setup
consumerService.runConsumer().then((connection) => {
    logger.debug("Consumer Successfully executed  ")
}).catch((err) => {
    logger.error("Error in consumer execution", err)
})
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morganMiddleware);
app.use(cors({
    origin: "*"
}));

// Route setup
app.use('/', routes);
app.use((req, res) => {
    res.status(200).json({ status: 'success' });
});

// Server initialization
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    // connectDB(); // Uncomment if database connection is needed
    logger.info(`Trello Task Service Server running on port ${PORT}`);
});

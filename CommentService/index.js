const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser'); // Import body-parser
const {logger, morganMiddleware} = require('./services/logger.service');
require('dotenv').config({path: '.env.local'});

const app = express();
const routes = require('./route/index.route')
const cors = require('cors');
const consumer = require('./messageQueue/consumer');

app.use(cors({
    origin: "*"
}));

// consumer().catch((err) => {
//     logger.error(err);
// })
app.use(bodyParser.urlencoded({extended: true})); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies


app.use(morganMiddleware);
app.use(routes);
app.use('/', (req, resp) => {
    resp.status(200).json({
        status: "success",

    })
})

const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
    // connectDB();
    logger.info(`Trello Task Service Server running on port ${PORT}`);
});
const topicsConfig = require('./topics.json');

const extractTopics = () => {
    const allTopics = Object.values(topicsConfig).flatMap(Object.values);
    return allTopics;
}


module.export = { extractTopics }
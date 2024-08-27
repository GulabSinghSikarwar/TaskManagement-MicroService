const topicsConfig = require('./topics.json'); // Example path for topics.json
const t=Object.values(topicsConfig)
console.log(" s : ",t);


const allTopics = Object.values(topicsConfig).flatMap(Object.values);
console.log(allTopics[0]);

// console.log("node : ",allTopics);

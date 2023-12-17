const viewTopic = {
    topic : "view",
    numPartitions: 1,
    replicationFactor: 1
}

const listenTopic = {
    topic : "listen",
    numPartitions: 1,
    replicationFactor: 1
}

const searchTopic = {
    topic : "search",
    numPartitions: 1,
    replicationFactor: 1
}

const filterTopic = {
    topic : "filter",
    numPartitions: 1,
    removeEventListener: 1,
}

const topics = [viewTopic, listenTopic, searchTopic];

export {topics};

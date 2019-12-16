

const sqsProducer = require('sqs-producer');
const { Consumer } = require('sqs-consumer');
const config = require('config');
const awsConfig = config.get('aws');
const { Site, Subscriber, Notification } = require('../../module/db');
const utils = require('../utility/index')

const producer = sqsProducer.create({
    queueUrl: awsConfig.qUrl,
    region: awsConfig.region,
    accessKeyId: awsConfig.accessKey,
    secretAccessKey: awsConfig.secretKey
});


const methods = {};

//Polling queu data
(async function pollQueueMessages() {
    const app = Consumer.create({
        queueUrl: awsConfig.qUrl,
        region: awsConfig.region,
        batchSize: 6,
        handleMessageBatch: async (messages) => {
            try {
                Promise.all(messages.map(async msg => {
                    methods.dumpNotification(msg)
                }))
            } catch (err) {
                console.log("Error while dumping notification", err);
            }

        },

    });

    app.on('error', (err) => {
        console.log("Error while executing message", err);
    });

    app.start();

})()


let poll = ()=>{

}
poll()


//Pushing records in queue for further process
methods.pushToQueue = function (data) {
    producer.send(data.notifications, function (err) {
        if (err)
            console.log("Error While pushing Notification Records to queue")
    });

}

//Dump data to db
methods.dumpNotification = async function (rec) {

        rec.epoch = Date.now();
        let notiData = new Notification(rec);
        notiData.save();
}




module.exports = methods;

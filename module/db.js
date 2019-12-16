const mongoose = require('mongoose');



mongoose.connect("mongodb://127.0.0.1/push_notification", { useNewUrlParser: true }, function (err) {
    if (err)
        throw err;

    console.log('Successfully connected With DB');
});



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
});



const siteSchema = new mongoose.Schema({
    site_id: String,
    epoch: Number

});

const subscriberSchema = new mongoose.Schema({
    subscriber_id: String,
    site_id: String,
    epoch: Number

});
const notificationSchema = new mongoose.Schema({
    notification_id: String,
    notification_click: Boolean,
    notification_view: Boolean,
    epoch: Number,
    title: String,
    subscriber: {
        subscriber_id: String,
        site_id: String
    }
});

const Site = mongoose.model("site", siteSchema);
const Subscriber = mongoose.model("subscriber", subscriberSchema);
const Notification = mongoose.model("notification", notificationSchema);

module.exports = {
    Site,
    Subscriber,
    Notification
};


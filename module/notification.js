
const utils = require('../services/utility');
const sqs = require('../services/sqs')

const { Site, Subscriber, Notification } = require('../module/db');
const moment = require('moment')

const methods = {};


methods.createNotification = async data => {
    try {

        sqs.pushToQueue(data)

        return { status: true, message: "Request Processed successfully", response: {} };
    } catch (err) {
        let code = utils.errorCode('log_CREATE_ERROR'), message = utils.errorMessage(code);
        throw { error: { code, message } }
    }

}

methods.getAnalytics = async data => {
    try {

        let search = {};

        search.notification_click = true
        search.notification_view = true

        search.site_id = data.site_id

        let [notification_view_records, notification_click_records, site_records] = await getAggregateNotificationRec(search)


        return { status: true, message: "Request Processed successfully", response: { notification_view_records, notification_click_records, site_records } };
    } catch (err) {
        let code = utils.errorCode('log_CREATE_ERROR'), message = utils.errorMessage(code);
        throw { error: { code, message } }
    }

}


async function getAggregateNotificationRec(search) {

    const lastDay = moment().startOf('day').subtract(1, 'days').valueOf()
    const lastWeek = moment().startOf('week').subtract(1, 'week').valueOf()
    const lastMonth = moment().startOf('month').subtract(1, 'months').valueOf()

    return await Promise.all([

        Notification.aggregate([
            { $match: { notification_click: search.notification_click } },
            { $group: { _id: "$notification_click", notification_click: { $sum: 1 } } }
        ]),

        Notification.aggregate([
            { $match: { notification_view: search.notification_view } },
            { $group: { _id: "$notification_view", notification_view: { $sum: 1 } } }

        ]),

        Notification.aggregate([
            {
                $facet: {
                    "subscriber_Details": [
                        { $match: { 'subscriber.site_id': search.site_id } }
                    ],
                    "groupByDay": [
                        { $match: { epoch: { $gt: lastDay, $lt: Date.now() } } },
                        { $match: { notification_view: search.notification_view } },

                        { $group: { _id: "$notification_view", notification_view: { $sum: 1 } } }
                    ],

                    "groupByWeek": [
                        { $match: { epoch: { $gt: lastWeek, $lt: Date.now() } } },
                        { $match: { notification_view: search.notification_view } },
                        { $group: { _id: "$notification_view", notification_view: { $sum: 1 } } }
                    ],

                    "groupByMonth": [
                        { $match: { epoch: { $gt: lastMonth, $lt: Date.now() } } },
                        { $match: { notification_view: search.notification_view } },
                        { $group: { _id: "$notification_view", notification_view: { $sum: 1 } } }
                    ],

                }
            }
        ])

    ])


}


module.exports = methods;

let joi = require('joi');

const subscriber_schema = {
    subscriber_id: joi.string().required(),
    site_id: joi.string().required()
}


const notificationScheme = {
    notification_id: joi.string().required(),
    subscriber: joi.object(subscriber_schema).required(),
    notification_click: joi.boolean().required(),
    notification_view: joi.boolean().required(),
    title: joi.string(),
    message: joi.string()
}
//To validate query in request body
exports.createNotification = joi.array().min(1).items(joi.object(notificationScheme)).required(),

//To validate query in request body
exports.validateAnalytics = joi.object().keys({
    site_id: joi.string().required()

})


exports.getErrorMessage = function (err) {
    err.details[0].message = err.details[0].message.replace(/\"/g, '')
    if (err.details[0].path.length == 1)
        return err.details[0].message;
    else {
        var path = err.details[0].path.join(".");
        if (path.trim().length > 0)
            path = " at path " + path;
        return err.details[0].message + path;

    }
}
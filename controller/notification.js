

const notiModule = require('../module/notification');
const schema = require('../lib/validator');
const joi = require('joi');
const methods = {}





methods.createRecords = function (req, res) {
    const reqData = req.body;
    joi.validate(reqData.notifications, schema.createNotification, async function (err, value) {
        
        if (err) {
            res.send({ status: false, message: schema.getErrorMessage(err) })
        } else {
            try {

                let result = await notiModule.createNotification(reqData)
                res.send(result)

            } catch (err) {
                res.send(err);
            }

        }
    })
}


methods.getAnalytics = function (req, res) {
    const reqData = req.body;
    
    joi.validate(reqData, schema.validateAnalytics, async function (err, value) {
        
        if (err) {
            res.send({ status: false, message: schema.getErrorMessage(err) })
        } else {
            try {

                let result = await notiModule.getAnalytics(reqData)
                res.send(result)

            } catch (err) {
                res.send(err);
            }

        }
    })
}


module.exports = methods;


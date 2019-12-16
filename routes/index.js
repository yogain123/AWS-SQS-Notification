



const express = require('express');
const router = express.Router();
const notification = require('../controller/notification');


router.get('/', (req, res) => {
    res.send("Server is Up")
});

router.post("/notification/log/create", notification.createRecords);

router.post("/notification/analytics/details", notification.getAnalytics);





module.exports = router;
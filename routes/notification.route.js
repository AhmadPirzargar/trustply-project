const express = require('express');
const router = express.Router();
const notificationService = require('../service/notification.service');

router.get('', (req, res) => {
    const userId = req.headers.currentuser;
    console.log('get user notifications for user : ', userId);
    notificationService.getNotifications(userId, notifies => {
        console.log( userId + ' notifies : ', notifies);
        res.send(notifies);
    });
    notificationService.clearNotifications(userId, result => {
        console.log('clear notification result', result);
    });
});

router.post('', (req, res) => {
    const b = req.body;
    notificationService.save({from: b.from,to:b.to,message: b.message }, result => {
       return res.send({status: result});
    })
});

module.exports = router;
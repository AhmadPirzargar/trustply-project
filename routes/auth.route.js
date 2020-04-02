const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

router.post('/login', (req, res) => {
    if (req.body && req.body.userId) {
        return userService.getByUserId(req.body.userId, (user) => {
            const password = req.body.password;
            if (password && password === user.pass) {
                const token = 'Basic ' + Buffer.from(user.userId + ':' + user.pass).toString('base64');
                console.log('token : ', token);
                return res.status(200).send({token});
            } else {
                return res.status(401).send('invalid username or password');
            }
        });
    }
    return res.status(401).send('invalid username or password');

});

module.exports = router;


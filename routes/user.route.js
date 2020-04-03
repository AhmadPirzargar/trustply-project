const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

router.get('', (req,res) => {
    userService.getAll(users => {
        users.forEach(user => delete user.pass);
        return res.send(users);
    })
});

router.get('/:userId', (req, res) => {
    const userId = req.param('userId');
    userService.getByUserId(userId, (user) => {
        if (req.headers.currentuser !== userId) {
            delete user.pass;
        }
        res.send(user);
    });
});

router.put('/:userId', (req, res) => {
    const userId = req.param('userId');
    try {
        if (req.headers.currentuser === userId) {
            req.body.userId = userId;
            userService.updateByUserId(req.body, (result) => {
                return res.send(result);
            });
        } else {
            return res.send('access denied')
        }
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});


module.exports = router;
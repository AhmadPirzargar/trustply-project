const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const notificationRouter = require('./routes/notification.route');
const authRouter = require('./routes/auth.route');
const basicAuth = require('./service/auth.service');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(basicAuth);
app.use('/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/notification', notificationRouter);
module.exports = app;



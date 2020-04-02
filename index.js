const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const userservice = require('./service/user.service');
const basicAuth = require('./service/auth.service');
const cors = require('cors');
app.use(express.json());
app.use(basicAuth);
app.use(cors());
app.use('/auth', authRouter);
app.use('/api/users', userRouter);
module.exports = app;



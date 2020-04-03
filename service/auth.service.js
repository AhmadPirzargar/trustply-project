const userService = require('../service/user.service');

module.exports = basicAuth;

async function basicAuth(req, res, next) {
    if (req.path === '/auth/login') {
        return next();
    }
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({message: 'Missing Authorization Header'});
    }
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    try {
        userService.getByUserId(username, (user) => {
            if (user.pass === password) {
                req.headers.currentuser = username;
                next();
            } else
                return res.status(401).json({message: 'Invalid Authentication Credentials'});
        });
    } catch (e) {
        return res.status(401).json({message: 'Invalid Authentication Credentials'});
    }

}
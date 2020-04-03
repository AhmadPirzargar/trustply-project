const db = require('./database.service');

function getAll(callback) {
    db.query(`select * from user`, (err, rows) => {
        if (err) {
            console.log('get user by id err: ', err);
            throw new Error(err)
        } else {
            const user = JSON.parse(JSON.stringify(rows));
            console.log('user : ', user);
            return callback(user);
        }
    });
}

function getById(id, callback) {
    db.query(`select * from user where id = ${id}`, (err, rows) => {
        if (err) {
            console.log('get user by id err: ', err);
            throw new Error(err)
        } else {
            const user = JSON.parse(JSON.stringify(rows[0]));
            return callback(user);
        }
    });
}

function getByUserId(userId, callback) {
    db.query(`select * from user where userId = '${userId}'`, (err, rows) => {
        if (err) {
            console.log('get user by id err: ', err);
            throw new Error(err)
        } else {
            const user = JSON.parse(JSON.stringify(rows[0]));
            return callback(user);
        }
    });
}

function update(user,callback) {
    db.query(`UPDATE user SET name='${user.name}',userId='${user.userId}',pass='${user.pass}',socialLink='${user.socialLink}' WHERE id =${user.id}`,
        (err, rows) => {
        if (err) {
            throw new Error(err)
        } else {
            const result = JSON.parse(JSON.stringify(rows));
            return callback(result);
        }
    });
}
function updateByUserId(user,callback) {
    db.query(`UPDATE user SET name='${user.name}',socialLink='${user.socialLink}' WHERE userId ='${user.userId}'`,
        (err, rows) => {
            if (err) {
                throw new Error(err)
            } else {
                const result = JSON.parse(JSON.stringify(rows));
                return callback(result);
            }
        });
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.getByUserId = getByUserId;
module.exports.update = update;
module.exports.updateByUserId = updateByUserId;
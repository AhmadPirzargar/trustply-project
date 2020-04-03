const db = require('./database.service');

function save(n,callback) {

    db.query(`INSERT INTO \`notification\`(\`from\`, \`to\`, \`message\`) VALUES ('${n.from}', '${n.to}', '${n.message}');`, (err, rows) => {
        if (err) {
            throw new Error(err)
        } else {
            return callback(true);
        }
    });
}

function getNotifications(userId,callback) {
    db.query(`SELECT * from notification where \`to\` = '${userId}';`, (err, rows) => {
        if (err) {
            throw new Error(err)
        } else {
            const notifications = JSON.parse(JSON.stringify(rows));
            return callback(notifications);
        }
    });
}

function clearNotifications(userId,callback) {
    db.query(`delete from notification where \`to\` = '${userId}';`, (err, rows) => {
        if (err) {
            throw new Error(err)
        } else {
            const result = JSON.parse(JSON.stringify(rows));
            return callback(result);
        }
    });
}

module.exports.save = save;
module.exports.clearNotifications = clearNotifications;
module.exports.getNotifications = getNotifications;
const mysql = require('mysql');
const config = require('config');

const connctionConfig = {
    host: config.get('db.host'),
    user: config.get('db.user'),
    password: config.get('db.pass'),
    database: config.get('db.name')
};
console.log('connection config : ',connctionConfig);
const pool = mysql.createPool(connctionConfig);

function query(sql, callback){
    pool.getConnection(function(err, connection){
        if(err)
        console.log('connection err : ',err);
        connection.query(sql, function(err, rows){
            callback(err, rows);
            connection.release();
        });
    });
}

function excute(sql, arr, callback) {
    pool.getConnection(function(err, connection){
        connection.query(sql, arr, function(err, rows){
            callback(err, rows);
            connection.release();
        });
    });
}
module.exports.query = query;
module.exports.excute = excute;
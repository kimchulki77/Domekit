/**
 * Created by mac on 15. 9. 8..
 */
var mysql = require('mysql')
    , dbConnection = mysql.createConnection({
    host: global.config.dbHost,
    port: global.config.dbPort,
    user: global.config.dbUserName,
    password: global.config.dbUserPw,
    database: global.config.dbName,
    connectionLimit: 20,
    waitForConnections: false
});


exports.connect = function () {
    dbConnection.connect(function (err) {
        if (err) {
            console.log('DB error!' + err);
            return;
        }
        dbConnection.on('connected', function () {
            console.log('DB connected');
        });
        dbConnection.on('error', function () {
            console.log('DB error');
        });
    });
};
exports.disconnect = function () {
    // DB 연결을 끊습니다.
    dbConnection.disconnect(function (err) {
        console.log("error :  " + err);
    });
};
exports.getDBConection = function () {
    return dbConnection;
};
/*
 var mongoose = require('mongoose')
 , config = require('./config');

 mongoose.connect(config.mongoDbUrl);
 */


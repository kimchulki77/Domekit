/**
 * Created by mac on 15. 9. 8..
 */
var mysql = require('mysql');

var db = (function () {
    var dbConnection
        , INSTANCE;

    function Singleton() {
        dbConnection = mysql.createConnection({
            host: global.config.DB_HOST,
            port: global.config.DB_PORT,
            user: global.config.DB_USER_NAME,
            password: global.config.DB_USER_PW,
            database: global.config.DB_NAME,
            connectionLimit: 20,
            waitForConnections: false
        });
    }

    Singleton.prototype = {
        connect: function () {
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
        }
        , disconnect: function () {
            dbConnection.disconnect(function (err) {
                console.log("error :  " + err);
            });
        }
        , getDBConnection: function () {
            return dbConnection;
        }
    };

    return {
        getInstance: function () {
            if (INSTANCE == undefined) {
                INSTANCE = new Singleton();
            }
            return INSTANCE;
        }
    }

});

exports.getInstance = db().getInstance;



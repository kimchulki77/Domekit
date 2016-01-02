/**
 * Created by mac on 2015. 12. 31..
 */
/**
 * Created by mac on 2015. 12. 31..
 */

var dbConnection = require('../db').getInstance().getDBConnection()
    , queryMaker = require('../utils/QueryMaker').getInstance()
    , util = require('util');


exports.GoodsLog = GoodsLog;
function GoodsLog() {
    this.tableName = 'dmk_goods_log';
    queryMaker.setTableName(this.tableName);
}
GoodsLog.prototype = {
    logClickedGoods: function (req, fn) {
        var oBody = req.body
            , ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

        dbConnection.query(
            queryMaker.insert({
                COLUMN: util.format('url="%s",src="%s",name="%s", ip="%s"'
                    , oBody.url, oBody.src, oBody.name, ip)
            }),
            fn);
    }
    , getClickedGoods: function (fn) {
        dbConnection.query(
            queryMaker.select({
                FROM: this.tableName
            })
        ,fn);
    }
};

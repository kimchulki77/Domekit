/**
 * Created by mac on 2015. 12. 31..
 */
/**
 * Created by mac on 2015. 12. 31..
 */

var dbConnection = require('../db').getDBConection()
    , QueryMaker = require('../utils/query').QueryMaker
    , util = require('util');


exports.GoodsLog = GoodsLog;
function GoodsLog() {
    var tableName = 'dmk_goods_log';
    this.queryMaker = new QueryMaker(tableName);
}
GoodsLog.prototype = {
    logClickGoods: function (req, fn) {
        var oBody = req.body
            , ip = req.header('x-forwarded-for') || req.connection.remoteAddress
            , that = this;

        dbConnection.query(
            that.queryMaker.insert({
                COLUMN: util.format('url="%s",src="%s",name="%s", ip="%s"'
                    , oBody.url, oBody.src, oBody.name, ip)
            }),
            fn);

    }
};

/**
 * Created by mac on 2015. 12. 31..
 */

var GoodsLog = require('../models/goodsLog').GoodsLog
    , goodsLog = new GoodsLog;

exports.logClickedGoods = logClickedGoods;
function logClickedGoods(req, res) {
    goodsLog.logClickedGoods(req, function () {
        console.log('successfully save');
    });
}


exports.getGoodsLogList = getGoodsLogList;
function getGoodsLogList(req, res) {
    goodsLog.getClickedGoods(function (dbError, dbResult) {
        console.log(JSON.stringify(dbResult));
        res.render('pages/goods_log/index', {
            dbResult: dbResult
        });
    });
}


/**
 * Created by mac on 2015. 12. 31..
 */

var GoodsLog = require('../models/goodsLog').GoodsLog;

exports.logClickGoods = logClickGoods;
function logClickGoods (req,res){
    var goodsLog = new GoodsLog;

    goodsLog.logClickGoods(req,function(){
        console.log('successfully save');
    });
}
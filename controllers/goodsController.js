/**
 * Created by mac on 2015. 12. 31..
 */
var Goods = require('../models/goods').Goods;


exports.getProductList = getProductList;
function getProductList(req, res) {
    var goods = new Goods();

    res.render('pages/detail/index', goods.getGridGoods());
}

exports.logClickGoods = logClickGoods;
function logClickGoods(req, res) {
    var goods = new Goods();

    goods.logClickGoods(req);
}
/**
 * Created by mac on 2015. 12. 31..
 */
var Goods = require('../models/goods').Goods;


function getProductList(req, res) {
    var goods = new Goods();

    res.render('pages/detail', goods.getGridGoods());
}
exports.getProductList = getProductList;
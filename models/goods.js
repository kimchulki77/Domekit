/**
 * Created by mac on 2015. 12. 31..
 */

var dbConnection = require('../db').getInstance().getDBConnection()
    , queryMaker = require('../utils/QueryMaker').getInstance()
    , util = require('util');


exports.Goods = Goods;
function Goods() {
    var sTableName = 'dmk_goods';
    queryMaker.setTableName(sTableName);
}
Goods.prototype = {
    getGridGoods: function () {
        return {
            goods: [
                {
                    url: "http://storefarm.naver.com/domekit/products/324324231",
                    src: "/domekit/goods_img/아두이노 아크릴 RC카 세트.png",
                    name: "아두이노 아크릴 RC카 세트"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/349746323",
                    src: "/domekit/goods_img/스크린샷 2015-12-29 오후 1.26.01.png",
                    name: "홀센서"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/320697659",
                    src: "/domekit/goods_img/스크린샷 2015-12-29 오후 1.29.57.png",
                    name: "아두이노 초보자 스타터 키트"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/344493415",
                    src: "/domekit/goods_img/스크린샷 2015-12-29 오후 1.40.59.png",
                    name: "XY 이동 장치"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/299033073",
                    src: "/domekit/goods_img/스크린샷 2015-12-29 오후 1.45.02.png",
                    name: "아두이노 UNO R3"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/308227480",
                    src: "/domekit/goods_img/스크린샷 2015-12-29 오후 1.49.27.png",
                    name: "아두이노 메가 2560"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/317088892",
                    src: "/domekit/goods_img/스크린샷 2015-12-29 오후 1.52.01.png",
                    name: "아두이노 DUE R3"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/299674946",
                    src: "/domekit/goods_img/스크린샷 2015-12-29 오후 2.01.03.png",
                    name: "아두이노 Tiny RTC & eeprom"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/336500087",
                    src: "/domekit/goods_img/스크린샷 2015-12-29 오후 10.49.11.png",
                    name: "전자부품 보관 박스"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/332429440",
                    src: "/domekit/goods_img/휴대용 멀티 테스터기.png",
                    name: "휴대용 멀티 테스터기"
                },

            ]
        };
    }
};

/**
 * Created by mac on 15. 11. 13..
 */

var dbConnection = require('../../db').getInstance().getDBConnection()
    , queryMaker = require('../../utils/QueryMaker').getInstance()
    , util = require('util');


//==============================
function User() {
    var sTableName = 'hd_user';
    queryMaker.setTableName(sTableName);
}
User.prototype = {
    /*
     * 회원정보를 받아옵니다.
     * */
    getUserInfo: function (userno, fn) {

        this.isExistUser(userno, function (isExist) {
            if (isExist == true) {
                dbConnection.query(
                    queryMaker.select({
                        COLUMN: 'userno, user_id, user_pw',
                        WHERE: util.format('userno="%s"', userno)
                    }),
                    fn);
            } else {
                console.log('존재 않함');
            }
        });
    },
    /*
     * 회원정보를 받아옵니다.
     * */
    getUserInfoById: function (userId, fn) {

        this.isExistUserById(userId, function (isExist) {
            if (isExist == true) {
                console.log('user exist');
                dbConnection.query(
                    queryMaker.select({
                        COLUMN: 'userno, user_id, user_pw',
                        WHERE: util.format('user_id="%s"', userId)
                    }),
                    fn);
            } else {
                console.log('존재 않함');
            }
        });
    },
    /*
     * 회원존재를 확인합니다.
     */
    isExistUser: function (userno, fn) {
        dbConnection.query(
            queryMaker.select({
                COLUMN: 'userno',
                WHERE: util.format('userno="%s"', userno)
            }),
            function (dbError, dbResult) {
                //데이터가 존재하면
                if (dbResult[0] != null) {
                    console.log("회원 있다");
                    fn(true);
                } else {
                    console.log("회원 없다");
                    fn(false);
                }
            });
    },
    /*
     * 회원존재를 확인합니다.
     */
    isExistUserById: function (userId, fn) {
        dbConnection.query(
            queryMaker.select({
                COLUMN: 'userno',
                WHERE: util.format('user_id="%s"', userId)
            }),
            function (dbError, dbResult) {
                //데이터가 존재하면
                if (dbResult[0] != null) {
                    console.log("회원 있다");
                    fn(true);
                } else {
                    console.log("회원 없다");
                    fn(false);
                }
            });
    },
    /*
     * 회원을 생성합니다.
     * */
    createUser: function (oUser, fn) {
        this.isExistUserById(oUser.user_id, function (isExist) {
            if (isExist == true) {
                console.log('아이디가 이미 존재하여 회원가입할 수 없습니다.');
            } else {
                console.log('아이디가 존재하지 않으므로 회원가입할 수 있습니다.');
                dbConnection.query(
                    queryMaker.insert({
                        COLUMN: util.format('user_id="%s", user_pw="%s"', oUser.user_id, oUser.user_pw)
                    }),
                    fn
                );
            }
        });
    }
};
//==============================

exports.User = User;
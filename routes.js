var UserController = require('./controllers/user_controller')
    , GoodsController = require('./controllers/goodsController')
    , GoodsLogController = require('./controllers/goodsLogController')
    , ThumbsMakerController = require('./controllers/thumbsMakerController');

var fs = require('fs');
var http = require('http');
//hello!!


exports.route = function (app, passport) {

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy({
            usernameField: 'user_id',
            passwordField: 'user_pw',
            passReqToCallback: true
        }
        , UserController.authenticate
    ));

// 인증 후, 사용자 정보를 Session에 저장함
    passport.serializeUser(function (user, done) {
        console.log('serialize' + JSON.stringify(user));
        done(null, user);
    });

// 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
    passport.deserializeUser(function (user, done) {
        //findById(id, function (err, user) {
        console.log('deserialize :::::' + user);

        done(null, user);
        //});
    });


    app.get('/', GoodsController.getProductList);
    app.get('/domekit', GoodsController.getProductList);
    app.get('/domekit/thumbs_maker', ThumbsMakerController.index);
    app.post('/domekit/thumbs_maker', ThumbsMakerController.uploadImage);
    app.post('/domekit/saveImage', ThumbsMakerController.saveImage);
    app.post('/domekit/detail/log', GoodsLogController.logClickedGoods);

    app.get('/domekit/getLogList', GoodsLogController.getGoodsLogList);

    //region 로그인
    app.get('/login', UserController.login);
    app.post('/login',
        passport.authenticate('local', {failureRedirect: '/loginFailure', failureFlash: true}),
        function (req, res) {
            console.log("authentic");
            res.redirect('/loginSuccess');
        });
    app.get('/loginFailure', UserController.loginFailure);
    app.get('/loginSuccess', UserController.ensureAuthenticated, UserController.loginSuccess);

    app.get('/logout', UserController.logout);
    app.get('/mypage', UserController.mypage);
    //endregion

    //region 회원가입
    app.get('/join', UserController.join);
    // 폼내용을 확인 한 후 DB에 회원정보를 저장합니다.
    app.post('/joinEnd', UserController.joinEnd);
    //endregion


    app.get('*', function (req, res) {
        res.render('pages/404');
    });


};
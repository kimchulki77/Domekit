var UserController = require('./controllers/user_controller');

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

//    hlllllldsgsdgggddd

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

    app.get('/', function(req,res){

    });

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

    app.get('/testSession', function (req, res) {
        //console.log('=======================');
        //global.data = {user: 'data'};
        //console.log(global.data);
        //console.log('=======================');
        res.send(global.data);
        //try {
        //    console.log(req.session.passport.user.userno);
        //} catch (e) {
        //    console.log('catch!!!');
        //    console.log(e);
        //}
        res.end();
    });

    app.get('/testSession2', function (req, res) {
        console.log('=======================');
        console.log(global.data);
        console.log('=======================');
        res.send(global.data);
        //try {
        //    console.log(req.session.passport.user.userno);
        //} catch (e) {
        //    console.log('catch!!!');
        //    console.log(e);
        //}
        res.end();
    });

    app.get('/domekit', function (req, res) {
        res.render('pages/domekit/detail', {
            products: [
                {
                    url: "http://storefarm.naver.com/domekit/products/324324231",
                    src: "/domekit/img/아두이노 아크릴 RC카 세트.png",
                    name: "아두이노 아크릴 RC카 세트"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/349746323",
                    src: "/domekit/img/스크린샷 2015-12-29 오후 1.26.01.png",
                    name: "홀센서"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/320697659",
                    src: "/domekit/img/스크린샷 2015-12-29 오후 1.29.57.png",
                    name: "아두이노 초보자 스타터 키트"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/344493415",
                    src: "/domekit/img/스크린샷 2015-12-29 오후 1.40.59.png",
                    name: "XY 이동 장치"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/299033073",
                    src: "/domekit/img/스크린샷 2015-12-29 오후 1.45.02.png",
                    name: "아두이노 UNO R3"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/308227480",
                    src: "/domekit/img/스크린샷 2015-12-29 오후 1.49.27.png",
                    name: "아두이노 메가 2560"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/317088892",
                    src: "/domekit/img/스크린샷 2015-12-29 오후 1.52.01.png",
                    name: "아두이노 DUE R3"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/299674946",
                    src: "/domekit/img/스크린샷 2015-12-29 오후 2.01.03.png",
                    name: "아두이노 Tiny RTC & eeprom"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/336500087",
                    src: "/domekit/img/스크린샷 2015-12-29 오후 10.49.11.png",
                    name: "전자부품 보관 박스"
                },
                {
                    url: "http://storefarm.naver.com/domekit/products/332429440",
                    src: "/domekit/img/휴대용 멀티 테스터기.png",
                    name: "휴대용 멀티 테스터기"
                },

            ]
        });
    });

    app.get('*', function (req, res) {
        res.render('pages/404');
    });


};
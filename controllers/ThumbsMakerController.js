/**
 * Created by mac on 2015. 12. 31..
 */

var im = require('imagemagick')
    , fs = require('fs')
    , http = require('http')
    , async = require('async')
    , fstools = require('fs-tools')
    , path = require('path')
    , mime = require('mime')
    , formidable = require('formidable');

var dirname = __dirname + '/../'
    , baseImageDir = dirname + 'public/domekit/goods_img/';


exports.index = index;
function index(req, res) {
    res.render('pages/thumbs_maker/index');
}

exports.uploadImage = uploadImage;
function uploadImage(req, res) {
    // 안드로이드앱과 같은 모바일 애플리케이션에서의 요청의 인코딩 방식을 확인하기 위해 아래와 같이 검사구문 추가
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        // 모바일 업로드 요청

    } else {//multipart/form-data
        // 일반 웹페이지 업로드 요청

    }

    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(dirname + 'public/domekit/goods_img/temp');   // 업로드 디렉토리
    console.log(form.uploadDir);
    form.keepExtensions = true;                                 // 파일 확장자 유지
    form.multiples = true;                                      // multiple upload
    form.parse(req, function (err, fields, files) {
        // 이 미들웨어는 멀티파트 요청을 파싱하기 위해 form.parse를 사용하는데
        // form.parse의 콜백함수의 매개변수(fields, files)로 폼의 필드 정보들과 파일 정보들이 전달된다.
        var aDestPath = [];

        // 여러개의 파일을 업로드하는 경우
        if (files.pict instanceof Array) {
            // async.each를 사용해 files.pict배열 객체의 각각의 파일을 /images 디렉토리로 옮긴다.
            async.each(files.pict, function (file, cb) {
                // 파일명만 추출후 업로드되는 파일명으로 선택하여 이미지가 저장될 경로를 더해준다.
                var destPath = path.normalize(baseImageDir + path.basename(file.path));
                console.log('zzzz' + destPath);
                aDestPath.push(destPath.split(path.normalize(dirname))[1]);
                /*
                 var thumbPath = path.normalize(baseImageDir +'/thumbs/'+ path.basename(file.path));

                 console.log('resize' +thumbPath);
                 /// write file to uploads/thumbs folder
                 im.resize({
                 srcPath: destPath,
                 dstPath: thumbPath,
                 width:   200
                 }, function(err, stdout, stderr){
                 console.log('resized image to fit within 200x200px');
                 if (err) throw err;
                 });*/

                // 해당 파일명을 서버로 전송처
                fstools.move(file.path, destPath, function (err) {
                    if (err) cb(err);
                    else {
                        cb();
                    }
                })
            }, function (err) {
                // 최종 처리 콜백 함
                if (err) {
                    err.status(500);
                    next(err);
                }   // 에러가 아니면 성공여부 전달
                else {
                    res.status(200);
                    //res.json({error: null, data: 'Upload successful'});
                    res.render('pages/thumbs_maker/result', {
                        aDestPath: aDestPath,
                        title: fields.title
                    });
                }
            });
            // 파일을 선택하지 않았을때
        } else if (!files.pict.name) {
            // 파일 선택하지 않았을 경우 업로드 과정에서 생긴 크기가 0인 파일을 삭제한다.
            fstools.remove(files.pict.path, function (err) {
                if (err) {
                    err.status(500);
                    next(err);
                }
                else {
                    res.status(200);
                    //res.json({error: null, data: 'Upload successful'});
                    res.render('pages/thumbs_maker/result');
                }
            });
            // 파일을 하나만 선택했을때
        } else {
            // 업로드된 파일을(files.pict) /images디렉토리로 옮긴다.
            // 업로드 되는 파일명을 추출해서 이미지가 저장될 경로를 더해준다.
            var destPath = path.normalize(baseImageDir + path.basename(files.pict.path));

            console.log(destPath);
            // 임시 폴더에 저장된 이미지 파일을 이미지 경로로 이동시킨다.
            aDestPath.push(destPath.split(__dirname.split('/controllers')[0])[1].replace('/public',''));

            console.log(aDestPath[0]);

            fstools.move(files.pict.path, destPath, function (err) {
                if (err) {
                    err.status(500);
                    next(err);
                }
                else {
                    res.status(200);
                    //res.json({error: null, data: 'Upload successful'});
                    res.render('pages/thumbs_maker/result', {
                        aDestPath: aDestPath,
                        title: fields.title
                    });
                }
            })
        }
    });
    form.on('progress', function (receivedBytes, expectedBytes) {
        console.log(((receivedBytes / expectedBytes) * 100).toFixed(1) + '% received');
    });
}


exports.getImage = getImage;
// 이미지 조회 함수
function getImage(req, res, next) {
    // Get방식으로 이미지의 파일명을 조회하면 이 함수로 들어와 imagepath값을 얻어온후
    // 해당 파일이 존재하면 스트림을 통해 읽어 요청한 클라이언트로 전송한다.
    // 요청한 파일이 없으면 next 미들웨어를 실행한다.
    var imagepath = req.params.imagepath;
    var filepath = path.normalize(baseImageDir + imagepath);
    fs.exists(filepath, function (exists) {
        if (exists) {
            res.statusCode = 200;
            res.set('Content-Type', mime.lookup(imagepath));
            var rs = fs.createReadStream(filepath);
            rs.pipe(res);
        } else {
            next();
        }
    })
}

function makeResizedImage(srcPath, dstPath) {
    //region 저장되 이미지를 리사이징합니다.
    console.log('success save image ');

    console.log(dstPath);
    console.log(srcPath);

    /// write file to uploads/thumbs folder
    im.resize({
        srcPath: srcPath,
        dstPath: dstPath,
        width: 220
    }, function (err, stdout, stderr) {
        console.log('resized image to fit within 200x200px');
        if (err) throw err;
    });
    //endregion
}

exports.saveImage = saveImage;
//dataURL 이미지를 이미지파일로써 저장합니다.
function saveImage(req, res) {
    //var  data        = fs.readFileSync('base64', 'utf8'),
    var dataCombineImage = req.body.combineDataURL
        , dataImage = req.body.imgDataURL
        , combine_base64Data
        , combine_binaryData
        , sCombineImgName
        , sCombineImgPath
        , base64Data
        , binaryData
        , sImgName
        , sImgPath
        , sImgTitle;

    sImgTitle = req.body.title;

    combine_base64Data = dataCombineImage.replace(/^data:image\/png;base64,/, '');
    combine_base64Data += combine_base64Data.replace('+', ' ');
    combine_binaryData = new Buffer(combine_base64Data, 'base64').toString('binary');

    base64Data = dataImage.replace(/^data:image\/png;base64,/, '');
    base64Data += base64Data.replace('+', ' ');
    binaryData = new Buffer(base64Data, 'base64').toString('binary');

    sCombineImgName = sImgTitle;
    sCombineImgPath = baseImageDir + sImgTitle + '.png';

    sImgName = sImgTitle;
    sImgPath = baseImageDir + 'original/' + sImgTitle + '.png';

    fs.writeFile(sCombineImgPath, combine_binaryData, 'binary', function (err) {
        if (err) {
            console.log(err); // writes out file without error, but it's not a valid image
        } else {
            var srcPath = sCombineImgPath;
            var dstPath = baseImageDir + 'thumbs/' + sCombineImgName + '.png';
            makeResizedImage(srcPath, dstPath);

            fs.writeFile(sImgPath, binaryData, 'binary', function (err) {
                if (err) {
                    console.log(err); // writes out file without error, but it's not a valid image
                } else {

                    res.send(200);
                    res.end();
                }
            });
        }
    });
}
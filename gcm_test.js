/**
 * Created by mac on 2016. 1. 1..
 */
/**
 * Created by saltfactory on 6/20/14.
 */
/**
 * filename : android_gcm_provider.js
 */

var gcm = require('node-gcm');

// create a message with default values
var message = new gcm.Message();

// or with object values
var message = new gcm.Message({
    collapseKey: 'PhoneGapDemo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        title: 'Babel시스템',
        message: 'Babel시스템입니다.',
        msgcnt: 3
    }
});
var sender = new gcm.Sender('AIzaSyAjuoWTd-RxE7OlJbeP2K6ewIsDiglg2lQ'); // 구글 프로젝트에 등록한 GCM 서비스에서 만든 server API key를 입력한다.
var registrationIds = [];
registrationIds.push(
    'cFZ0CgBQ3a8:APA91bE7sjuLvALtczCXOryeAMax001jk9KWcdQfnHdBBmxQairovkfNrZA4AEEfyW9qDb4g4DRfYvEe8d9gttOrefpPyhISDfsggIGzOy5m9TWo7Zh6vRQt-AvhlA2pniJLDS01MzWw'
); // PhoneGap 프로젝트의 안드로이드 프로젝트에서 획득한 registerID를 입력한다. 이 registerID를 이용하여 안드로이드 디바이스에 푸시를 전송한다.

/**
 * Params: message-literal, registrationIds-array, No. of retries, callback-function
 **/
sender.send(message, registrationIds, 4, function (err, result) {
    console.log(result);
});
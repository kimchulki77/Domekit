/**
 * Created by mac on 15. 9. 25..
 */

define('App', [
    'jquery'
    , 'underscore'
    , 'bootstrap'
    , 'util'
    , 'moment'
    , 'plugins'
    , 'h2c'
], function ($
    , _
    , bs
    , util
    , moment
    , plugins
    , h2c) {
    return {
        start: function () {
            $("#btnSaveImage").on("click", function () {
                html2canvas($('.wrap-image-0'), {
                    onrendered: function (canvasCombineImage) {
                        html2canvas($('.wrap-image-0 .product-img'), {
                            onrendered: function (canvasImage) {
                                $.ajax({
                                    url: 'domekit/saveImage',
                                    data: {
                                        combineDataURL: canvasCombineImage.toDataURL(),
                                        imgDataURL: canvasImage.toDataURL(),
                                        title: $('.wrap-image-0 .title').text()
                                    },
                                    type: 'post',
                                    success: function (data) {
                                        plugins.toast('showWarningToast', "성공적으로 저장되었습니다.");
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    };
});

define(['jweixin'], function (wx) {

    function wxConfig(callback) {
        Booster.http.post("/api/wechat/jsapi/config", location.href.split('#')[0], function () {
            var wxConfig = JSON.parse(this.responseText);
            callback(wxConfig);
        });
    }

    function tryConfig() {
        wx._initialized || wxConfig(function(config) {
            wx.config({
                appId: config.app_id,
                timestamp: config.timestamp,
                nonceStr: config.nonce_str,
                signature: config.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'chooseImage',
                    'getLocalImgData',
                    'uploadImage'
                ]
            });
            wx._initialized = true;
        });
    }

    this.ready = function(callback) {
        wx.ready(function() {
            callback(wx);
        });
        tryConfig();
    };

    this.invoke = function(callback) {
        tryConfig();
        callback(wx);
    };

    return this;
});
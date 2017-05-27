(function (Booster) {

    // String useful functions
    if (!String.prototype.format) {
        String.prototype.format = function (a) {
            var args = typeof a == "object" ? a : arguments;
            return this.replace(/\{(\w+)\}/g, function (m, k) {
                return args[k];
            });
        };
    }

    if (!String.prototype.startWith) {
        String.prototype.startWith = function (str) {
            if (str == null || str == "" || this.length == 0 || str.length > this.length) {
                return false;
            }

            return this.substr(0, str.length) == str;
        };
    }

    // Array useful functions
    if (!Array.prototype.remove) {
        Array.prototype.remove = function (predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.remove called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    list.splice(i, 1);
                }
            }

            return undefined;
        };
    }

    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }

    // Date useful functions
    if (!Date.prototype.format) {
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S": this.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
    }

    // precondition check
    var precondition = {
        checkArgument: function (expression, errorMsg) {
            if (!expression) {
                throw new Error(errorMsg);
            }
        }
    };

    // session holder
    var session = {
        user: function(user) {
            if (user === undefined) {
                return Booster._user;
            }
            Booster._user = user;
        }
    };

    // utils - http
    var http = (function() {
        var request = function(method, url, data, callback) {
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                if (this.status > 500) {
                    window.location.hash = "/maintenance"
                } else if (this.readyState === 4) {
                    callback.call(this)
                }
            });
            xhr.open(method, url);
            xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send(data);
        };
        this.post = function(url, data, callback) {
            request("POST", url, data, callback);
        };
        this.get = function (url, callback) {
            request("GET", url, null, callback);
        };
        return this;
    })();

    Booster.precondition = precondition;
    Booster.session = session;
    Booster.http = http;

})(window.Booster || (window.Booster = function () {}));



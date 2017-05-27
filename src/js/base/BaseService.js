define(['class'], function (Class) {

    var checkArgument = Booster.precondition.checkArgument;

    var BaseService = Class.extend({

        _http: null,
        _scope: null,

        init: function (http, scope) {
            this._http = http;
            this._scope = scope;
        },

        get: function (endpoint, config) {
            checkArgument(this._http != null, "_http not initialized.");
            return this._http.get(endpoint, config);
        },

        post: function (endpoint, data, config) {
            checkArgument(this._http != null, "_http not initialized.");
            return this._http.post(endpoint, data, angular.extend({
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }, config));
        },

        postForm: function (endpoint, data, config) {
            checkArgument(this._http != null, "_http not initialized.");
            return this._http.post(endpoint, $.param(data), angular.extend({
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
            }, config));
        },

        postMultipartForm: function (endpoint, formData, config) {
            checkArgument(this._http != null, "_http not initialized.");
            return this._http.post(endpoint, formData, angular.extend({
                headers: {'Cache-Control': 'no-cache', 'Content-Type': undefined}
            }, config));
        },

        put: function (endpoint, data, config) {
            checkArgument(this._http != null, "_http not initialized.");
            return this._http.put(endpoint, data, angular.extend({
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }, config));
        },

        delete: function (endpoint, config) {
            checkArgument(this._http != null, "_http not initialized.");
            return this._http.delete(endpoint, config);
        }
    });

    return BaseService;

});
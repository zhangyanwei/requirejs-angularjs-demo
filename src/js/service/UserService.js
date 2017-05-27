define(['base/BaseService'], function (BaseService) {

    var UserService = BaseService.extend({

        init: function (http, scope) {
            this._super(http, scope);
        },

        register: function(user) {
            return this.post("/api/users", user);
        },

        bind: function(mobile, token) {
            return this.post("/api/users/bind", {
                mobile: mobile,
                token: token
            });
        },

        login: function (userInfo) {
            return this.postForm("/login?ajax=true", userInfo);
        },

        logout: function () {
            return this.get("/logout?ajax=true");
        },

        password: function(data) {
            return this.put("/api/users/password", data)
        },

        search: function(params) {
            return this.get("/api/members/search", {
                params: params
            });
        },

        authorities: function() {
            return this.get("/api/members/authorities", {
                cache: true
            });
        },
        message: function () {
            return this.get("/api/user/messages");
        }

    });

    angular.module('service.UserService', [])
        .provider('UserService', function () {
            this.$get = ['$http', '$rootScope', function (http, scope) {
                return new UserService(http, scope);
            }];
        });

});
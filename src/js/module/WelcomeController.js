define([
    'base/BaseController',
    'service/UserService',
    'bootstrap'
], function (BaseController) {

    var WelcomeController = BaseController.extend({

        init: function ($rootScope, $scope, $state, $stateParams, $userService) {
            this.$rootScope = $rootScope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$userService = $userService;
            this._super($scope);
        },

        defineScope: function () {
           this.$scope.message = "This is welcome message.";
           // TODO using $userService to communicate with server (RESTful APIs).
        }
    });

    WelcomeController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'UserService'];
    angular.module('module.WelcomeController', ['service.UserService'])
        .controller('WelcomeController', WelcomeController);

});


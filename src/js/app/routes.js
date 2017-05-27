define([
    'angular.ui.router'
], function () {
    'use strict';

    angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise(function ($injector) {
                var $state = $injector.get("$state");
                $state.go("404");
            });
            $stateProvider
                .state('main', {
                    abstract: true,
                    templateUrl: 'views/layout/main.html',
                    resolve: {
                        angular_ui_bootstrap: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load("angular.ui.bootstrap");
                        }]
                    }
                })
                .state('maintenance', {
                    url: '/maintenance',
                    templateUrl: 'views/maintenance.html',
                    data: {
                        authRequired: false
                    }
                })
                .state('404', {
                    url: '/404',
                    templateUrl: 'views/404.html',
                    data: {
                        authRequired: false
                    }
                })
        }
    ]).run(['$rootScope', '$state', '$stateParams', '$http',
        function ($rootScope, $state, $stateParams, $http) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);
});
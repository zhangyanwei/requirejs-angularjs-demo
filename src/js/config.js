//Load common code that includes config, then load the app
//logic for this page. Do the require calls here instead of
//a separate file so after a build there are only 2 HTTP
//requests instead of three.
define(['booster'], function () {

    //For any third party dependencies, like jQuery, place them in the lib folder.
    requirejs.config({

        //To get timely, correct error triggers in IE, force a define/shim exports check.
        //enforceDefine: true,
        waitSeconds: 0,
        baseUrl: 'js',
        paths: {
            'lib': '../lib',

            // requirejs plugins
            'domReady': '../lib/domReady',

            // jquery and plugins
            'jquery': [
                // 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
                '../lib/jquery/jquery.min'
            ],
            'jquery.validator': '../lib/jquery/validate',

            // angular and plugins
            'angular': [
                // 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular',
                // 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min',
                '../lib/angular/angular.min'
            ],
            'angular.ui.router': '../lib/angular/angular-ui-router.min',
            'angular.ui.bootstrap': '../lib/angular/ui-bootstrap-tpls-2.0.0.min',
            'angular.oc.lazyLoad': [
                '../lib/angular/oclazyload/ocLazyLoad.min'
            ],

            // bootstrap and plugins
            'bootstrap': '../lib/bootstrap/js/bootstrap.min',

            // object oriented
            'class': '../lib/class',
            'namespace': '../lib/namespace',

            'async': '../lib/async'
        },

        map: {
            '*': {
                'css': '../lib/css/css.min'
            }
        },

        //Remember: only use shim config for non-AMD scripts,
        //scripts that do not already call define(). The shim
        //config will not work correctly if used on AMD scripts,
        //in particular, the exports and init config will not
        //be triggered, and the deps config will be confusing
        //for those cases.
        shim: {
            'class': {
                exports: 'Class'
            },
            // exports
            'angular': {
                exports: 'angular'
            },

            // angular
            'angular.ui.router': ['angular'],
            // 'angular.ui.bootstrap': ['angular', 'bootstrap'],
            'angular.oc.lazyLoad': ['angular'],

            // dependencies
            // jquery
            'bootstrap': ['jquery'],

            'jquery.validator': ['jquery']
        }
    });

});
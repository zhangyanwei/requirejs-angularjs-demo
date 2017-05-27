({
	appDir: "./src/",
	baseUrl: "js",
	dir: "build/",
	modules: [
		{
			name: "main"
		},
		{
			name:                             "app/demo",
			excludeShallow:                   ["app/template"]
		}
	],

	keepBuildDir: true,

	removeCombined: true,

	fileExclusionRegExp: /^lib/,

	optimizeCss: "standard",

	// cssImportIgnore: 'lib/csshake.min.css',

    map: {
        '*': {
            'css': '../lib/css/css.min'
        }
    },

    paths: {
        'lib': '../lib',

        // requirejs plugins
        'domReady': '../lib/domReady',

        // css plugin
        'css-builder': '../lib/css/css-builder',
        'normalize': '../lib/css/normalize',

        // jquery and plugins
        'jquery': '../lib/jquery/jquery.min',
        'jquery.validator': '../lib/jquery/validate',

        // angular and plugins
        'angular': '../lib/angular/angular.min',
        'angular.ui.router': '../lib/angular/angular-ui-router.min',
        'angular.oc.lazyLoad':  '../lib/angular/oclazyload/ocLazyLoad.min',

        // bootstrap and plugins
        'bootstrap': '../lib/bootstrap/js/bootstrap.min',

        'class': '../lib/class',
        'namespace': '../lib/namespace',

        'async': '../lib/async'
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
        'angular.oc.lazyLoad': ['angular'],

        // dependencies
        // jquery
        'bootstrap': ['jquery'],
        'jquery.validator': ['jquery']
    }
})
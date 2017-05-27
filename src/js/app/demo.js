define([
    'app/main',
    'app/routes'
], function () {

    angular.module('demo', [
        'app',
        'app.routes'
    ]).config( ['$compileProvider',function( $compileProvider ){
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|weixin|wxLocalResource|wxlocalresource):|data:image\/)/);
    }]);
});
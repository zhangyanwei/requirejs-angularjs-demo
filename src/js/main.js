require(['config'], function () {
    require([
        'app/demo'
    ], function (demo) {
        'use strict';

        /*
         * place operations that need to initialize prior to app start here
         * using the `run` function on the top-level module
         */
        require(['domReady!'], function (document) {
            angular.bootstrap(document, ['demo'], {
                //strictDi: true
            });
        });
    });
});
/**
 * Defines un-managed directives in the application.
 * NOTE: only use this out side the customer controllers.
 */
define([
    'angular',
    'app/filter/trust',
    'app/filter/trustUrl'
], function () {
    'use strict';

    angular.module('app.filters', [
        'app.filter.trust',
        'app.filter.trustUrl'
    ]);
});
/**
 * Defines un-managed directives in the application.
 * NOTE: only use this out side the customer controllers.
 */
define([
    'angular',
    'app/directive/promiseClick'
], function () {
    'use strict';

    angular.module('app.directives', [
        'app.directive.promiseClick'
    ]);
});
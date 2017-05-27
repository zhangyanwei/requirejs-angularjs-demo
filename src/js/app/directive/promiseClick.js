define(['angular'], function (angular) {

    angular.module('app.directive.promiseClick', []).directive('promiseClick', [function () {
        return {
            restrict: "A",
            template: "<div><span ng-if='waiting' class='glyphicon glyphicon-repeat' style='animation: roll 2s linear infinite;'></span><span ng-if='!waiting'ng-transclude></span></div>",
            transclude: true,
            scope: {
                click: "&promiseClick"
            },
            link: function (scope, element, attrs) {

                function wait(waiting) {
                    $(element).prop('disabled', waiting);
                    scope.waiting = waiting;
                    scope.$digest();
                }

                $(element).click(function(event) {
                    wait(true);
                    var promise = scope.click(event);
                    if (!promise) {
                        wait(false);
                        throw new ReferenceError("the click method should return the promise object, but it is null!");
                    }

                    promise
                        .finally(function() {
                            wait(false);
                        });
                });
            }
        };
    }]);
});
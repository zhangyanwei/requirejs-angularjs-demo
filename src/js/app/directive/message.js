define(['angular', 'jquery'], function() {

    // global index
    var index = 0;

    /**
     * receive the messages from the controllers and display it.
     */
    function message($timeout, $rootScope) {

        function close(id, $scope) {
            $scope.messages.remove(function (item) {
                return item && item._id == id;
            });
        }

        function autoClose(data, $scope) {
            $timeout(function () {
                $('[mid={0}]'.format(data._id)).fadeOut(500, function () {
                    $scope.$apply(function () {
                        close(data._id, $scope);
                    });
                });
            }, $scope.autoCloseDelay);
        }

        return {
            restrict: 'AE',
            templateUrl: 'views/directive/message.html',
            scope: {
                autoClose: '<',
                autoCloseDelay: '<',
                manualClose: '<'
            },
            link: function($scope, element, $attrs) {
                $scope.autoClose = $scope.autoClose === undefined || $scope.autoClose;
                $scope.manualClose = $scope.manualClose === undefined || $scope.manualClose;
                $scope.autoCloseDelay = $scope.autoCloseDelay || 3000;

                $scope.messages = [];
                $scope.close = function(id) {
                    close(id, $scope);
                };

                var listener = $attrs.root !== undefined ? $rootScope : $scope;
                listener.$on('g.event.message', function (event, data) {
                    data._id = index++;
                    $scope.messages.splice(0, 0, data);
                    $scope.autoClose && autoClose(data, $scope);
                });
            }
        };
    }

    angular.module('app.directive.message',[]).directive('message', ['$timeout', '$rootScope', message]);
});
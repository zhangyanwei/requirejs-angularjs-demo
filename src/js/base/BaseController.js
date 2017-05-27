define(['class'], function (Class) {

    var checkArgument = Booster.precondition.checkArgument;
    var transferData = Booster._transferData = {};

    function message(scope, event, type, title, content) {
        scope.$emit(event, {
            type: type,
            title: title,
            content: content
        })
    }

    /**
     * BaseController class as super class for all controllers in this application.
     *
     * Use of Class.js
     */
    var BaseController = Class.extend({

        init: function ($scope, $q) {
            checkArgument($scope, "scope is null, you should call this._super() to initialize the class in sub-class");
            this.$scope = $scope;
            this.$q || (this.$q = $q);
            this.defineScope();
            this._defineDefaultListeners();
        },

        /**
         * Initialize listeners needs to be overrided by the subclass.
         */
        defineListeners: function () {
            //OVERRIDE
        },

        /**
         * Use this function to define all scope objects.
         * Give a way to instantaly view whats available
         * publicly on the scope.
         */
        defineScope: function () {
            //OVERRIDE
        },

        /**
         * Triggered when controller is about
         * to be destroyed, clear all remaining values.
         */
        destroy: function (event) {
            $(window).off("scroll.search");
        },

        _defineDefaultListeners: function () {
            this.$scope.$on('$destroy', this.destroy.bind(this));
            this.defineListeners();
        },

        // common utils

        /**
         * message(type[, title], content)
         * @param {string} type
         * @param {string} [title]
         * @param {string} content
         */
        message: function (type, title, content) {
            if (content === undefined) {
                content = title;
                title = '';
            }

            var event = {
                type: type,
                title: title,
                content: content
            };
            this.$scope.$broadcast('g.event.message', event);
            this.$scope.$emit('g.event.message', event);
        },

        successMessage: function (title, content) {
            this.message('success', title, content);
        },

        infoMessage: function (title, content) {
            this.message('info', title, content);
        },

        warningMessage: function (title, content) {
            this.message('warning', title, content);
        },

        errorMessage: function (title, content) {
            this.message('danger', title, content);
        },

        // transfer data between views
        transfer: function (key, value) {
            if (value === undefined) {
                return transferData[key];
            }

            transferData[key] = value;
        },

        // search feature
        search: function (attr, api, query, append, init) {
            var _this = this, _search = function (append) {
                var deferred = _this.$q ? _this.$q.defer() : null;
                api(_this.$scope.query).then(
                    function (resp) {
                        _this.$scope[attr] || (_this.$scope[attr] = []);
                        _this.$scope[attr] = append ? ( _this.$scope[attr].concat(resp.data.result || [])) : resp.data.result;
                        _this.$scope.pagination.current = resp.data.current;
                        _this.$scope.pagination.total = resp.data.total;
                        _this.$scope.pagination.lastPage = (resp.data.current + 1) * _this.$scope.query.size >= resp.data.total;
                        deferred && deferred.resolve(resp.data);
                        _this.$scope.$emit('search.event', { attr: attr });
                    },
                    function (resp) {
                        _this.errorMessage(resp.data.message || '服务器正忙，请稍后重试');
                        _this.$scope[attr] = [];
                        deferred && deferred.reject(resp.data);
                        _this.$scope.$emit('search.event', { attr: attr });
                    }
                );
                return deferred ? deferred.promise : undefined;
            };

            function _reset() {
                _this.$scope.pagination = { current: 0, size: 10, total: 0 };
                _this.$scope.query = angular.extend({
                    size: _this.$scope.pagination.size
                }, query || {});
            }

            this.$scope.search = function (query, append) {
                query !== undefined && (_this.$scope.query = angular.extend(_this.$scope.query, query));
                return _search(append);
            };

            this.$scope.fullSearch = function (query) {
                _reset();
                return _this.$scope.search(query);
            };

            this.$scope.page = function (page) {
                return _this.$scope.search({
                    page: page || 0
                });
            };

            this.$scope.refresh = function () {
                return _search(false);
            };

            _reset();

            if (init === undefined || !!init) {
                return _search(append);
            }
        },

        scrollSearch: function() {
            checkArgument(this.$q, "$q is null, you should call this._super() to initialize the class in sub-class");
            var hasLock = false;
            $(window).on("scroll.search", function() {
                var height = $(window).height(),
                    position = $(document).scrollTop(),
                    c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
                if (height + position >= c) {
                    if (this.$scope.pagination.lastPage === false) {
                        if (!hasLock) {
                            hasLock = true;
                            this.$scope.query.page = this.$scope.pagination.current + 1;
                            this.$scope.search(undefined, true).finally(function () {
                                hasLock = false;
                            });
                        }
                    }
                }
            }.bind(this));
        }
    });
    BaseController.$inject = ['$scope', '$q'];

    return BaseController;

});
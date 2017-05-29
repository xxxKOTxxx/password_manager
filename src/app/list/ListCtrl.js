"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var ListCtrl = (function () {
    function ListCtrl($scope, $location, api) {
        var _this = this;
        this.$scope = $scope;
        this.$location = $location;
        this.api = api;
        this.search = '';
        this.password_list = [];
        this.filtered_list = [];
        this.ready = false;
        this.api.getList().then(function (data) {
            _this.password_list = data;
            _this.setData();
        });
    }
    ListCtrl.prototype.setData = function () {
        this.filtered_list = this.password_list;
        this.labels_list = _.map(this.password_list, 'label');
        this.ready = true;
    };
    Object.defineProperty(ListCtrl.prototype, "search_list", {
        get: function () {
            var _this = this;
            return this.labels_list.filter(function (item) {
                return item.toLocaleLowerCase().indexOf(_this.search.toLocaleLowerCase()) + 1;
            });
        },
        enumerable: true,
        configurable: true
    });
    ListCtrl.prototype.filter = function () {
        var _this = this;
        this.filtered_list = this.password_list.filter(function (item) {
            return item.label.toLocaleLowerCase().indexOf(_this.search.toLocaleLowerCase()) + 1;
        });
    };
    ListCtrl.prototype.create = function (label) {
        if (_.isUndefined(label)) {
            label = '';
        }
        this.$location.path("/create/" + label);
    };
    ListCtrl.prototype.edit = function (id) {
        this.$location.path("/edit/" + id);
    };
    ListCtrl.prototype.remove = function (id) {
        var _this = this;
        this.api.remove(id).then(function (data) {
            _this.password_list = data.data;
            _this.setData();
        });
    };
    return ListCtrl;
}());
ListCtrl.$inject = ["$scope", "$location", 'APIService'];
exports.default = ListCtrl;
//# sourceMappingURL=ListCtrl.js.map
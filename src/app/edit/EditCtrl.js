"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var EditCtrl = (function () {
    function EditCtrl($scope, $location, $routeParams, api) {
        var _this = this;
        this.$scope = $scope;
        this.$location = $location;
        this.$routeParams = $routeParams;
        this.api = api;
        this.ready = false;
        this.empty_password = {
            password: '',
            label: '',
            description: ''
        };
        this.id = _.isUndefined(this.$routeParams.id) ? null : parseInt(this.$routeParams.id);
        if (this.id === null) {
            var label = _.isUndefined(this.$routeParams.label) ? '' : this.$routeParams.label;
            var password = this.empty_password;
            password.label = label;
            this.setPassword(this.empty_password);
        }
        else {
            this.api.get(this.id).then(function (data) {
                _this.setPassword(data);
            });
        }
    }
    EditCtrl.prototype.setPassword = function (password) {
        this.password = password;
        this.ready = true;
    };
    EditCtrl.prototype.cancel = function () {
        this.$location.path("/");
    };
    EditCtrl.prototype.save = function (form) {
        var _this = this;
        if (form.$valid) {
            if (_.isNull(this.id)) {
                this.api.create(this.password).then(function (data) {
                    _this.$location.path("/");
                });
            }
            else {
                this.api.update(this.password).then(function (data) {
                    _this.$location.path("/");
                });
            }
        }
    };
    return EditCtrl;
}());
EditCtrl.$inject = ["$scope", "$location", "$routeParams", 'APIService'];
exports.default = EditCtrl;
//# sourceMappingURL=EditCtrl.js.map
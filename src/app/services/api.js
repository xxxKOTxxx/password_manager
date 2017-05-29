"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIService = (function () {
    function APIService($http, $q) {
        this.httpService = $http;
        this.qService = $q;
    }
    APIService.prototype.getList = function () {
        var self = this;
        var deferred = self.qService.defer();
        self.httpService.get('/password_list')
            .then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    APIService.prototype.get = function (id) {
        var self = this;
        var deferred = self.qService.defer();
        self.httpService.get("/password/" + id)
            .then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    APIService.prototype.create = function (password) {
        var self = this;
        var deferred = self.qService.defer();
        self.httpService.post('/password', password)
            .then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    APIService.prototype.update = function (password) {
        var self = this;
        var deferred = self.qService.defer();
        self.httpService.put("/password/" + password.id, password)
            .then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    APIService.prototype.remove = function (id) {
        var self = this;
        var deferred = self.qService.defer();
        self.httpService.delete("/password/" + id)
            .then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    return APIService;
}());
APIService.$inject = ['$http', '$q'];
exports.default = APIService;
//# sourceMappingURL=api.js.map
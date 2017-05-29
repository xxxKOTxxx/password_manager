"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Routes = (function () {
    function Routes($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
            templateUrl: "/templates/list.html",
            controller: "ListCtrl as list"
        })
            .when("/create/:label?", {
            templateUrl: "/templates/edit.html",
            controller: "EditCtrl as edit"
        })
            .when("/edit/:id", {
            templateUrl: "/templates/edit.html",
            controller: "EditCtrl as edit"
        })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode({
            enabled: true
        });
    }
    return Routes;
}());
exports.Routes = Routes;
Routes.$inject = ['$routeProvider', '$locationProvider'];
//# sourceMappingURL=routes.js.map
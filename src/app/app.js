"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
require("angular-route");
require("angular-resource");
require("angular-mocks");
require("angular-aria");
require("angular-animate");
require("angular-bootstrap");
require("angular-loading-bar");
require("angular-material");
var routes_1 = require("./routes");
var material_1 = require("./material");
require("./list/index");
require("./edit/index");
var api_1 = require("./services/api");
var backend_1 = require("./backend/backend");
var App;
(function (App) {
    angular.module('app.services', []);
    App.app = angular.module('app', [
        'ngRoute',
        'ngResource',
        'ngMockE2E',
        'app.services',
        'ngMaterial',
        'ListModule',
        'EditModule'
    ])
        .config(routes_1.Routes)
        .config(material_1.Material)
        .service('APIService', api_1.default)
        .run(backend_1.default);
})(App || (App = {}));
//# sourceMappingURL=app.js.map
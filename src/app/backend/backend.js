"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular = require("angular");
var _ = require("lodash");
// import * as db from './db.json';
var data = [
    {
        "id": 0,
        "password": "Gmail",
        "label": "Gmail",
        "description": "Gmail password"
    },
    {
        "id": 1,
        "password": "Dropbox",
        "label": "Dropbox",
        "description": "Dropbox password"
    },
    {
        "id": 2,
        "password": "Card",
        "label": "Card",
        "description": "Card number"
    },
    {
        "id": 3,
        "password": "Drupal",
        "label": "Drupal",
        "description": "Drupal password"
    }
];
var Backend = (function () {
    function Backend($httpBackend, password_list) {
        if (password_list === void 0) { password_list = data; }
        // Templates
        $httpBackend.whenGET(/^\/templates\/.*/).passThrough();
        // GET /password_list; returns all passwords.
        $httpBackend.whenGET('/password_list').respond(password_list);
        // GET /password/:id; returns password by id or 404 undefined.
        $httpBackend.whenGET(/\/password\/(\d+)/, undefined, ['id'])
            .respond(function (method, url, data, headers, params) {
            var id = parseInt(params.id);
            var password = _.find(password_list, { id: id });
            if (_.isUndefined(password)) {
                return [404, undefined, {}];
            }
            return [200, password, {}];
        });
        // POST /password; returns all passwords.
        $httpBackend.whenPOST('/password')
            .respond(function (method, url, data) {
            var id = 0;
            if (password_list.length) {
                var max = _.maxBy(password_list, 'id');
                if (!_.isUndefined(max.id)) {
                    id = max.id + 1;
                }
            }
            var password = angular.fromJson(data);
            password.id = id;
            password_list.push(password);
            return [200, password_list, {}];
        });
        // PUT /password/:id; returns all passwords.
        $httpBackend.whenPUT(/\/password\/(\d+)/, undefined, undefined, ['id'])
            .respond(function (method, url, data, headers, params) {
            var id = parseInt(params.id);
            var password = angular.fromJson(data);
            var index = _.findIndex(password_list, {
                id: id
            });
            password_list.splice(index, 1, password);
            return [200, password_list, {}];
        });
        // DELETE /password/:id; returns all passwords.
        $httpBackend.whenDELETE(/\/password\/(\d+)/, undefined, ['id'])
            .respond(function (method, url, data, headers, params) {
            var id = parseInt(params.id);
            _.remove(password_list, {
                id: id
            });
            return [200, password_list, {}];
        });
    }
    return Backend;
}());
exports.default = Backend;
Backend.$inject = ['$httpBackend'];
//# sourceMappingURL=backend.js.map
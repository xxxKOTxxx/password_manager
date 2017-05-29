"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Material = (function () {
    function Material($mdThemingProvider) {
        $mdThemingProvider.theme('dark')
            .primaryPalette('blue')
            .accentPalette('red')
            .warnPalette('orange')
            .backgroundPalette('grey');
    }
    return Material;
}());
exports.Material = Material;
Material.$inject = ['$mdThemingProvider'];
//# sourceMappingURL=material.js.map
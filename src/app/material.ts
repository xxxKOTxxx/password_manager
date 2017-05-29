export class Material {
  constructor(
    $mdThemingProvider: angular.material.IThemingProvider
  ) {
    $mdThemingProvider.theme('dark')
      .primaryPalette('blue')
      .accentPalette('red')
      .warnPalette('orange')
      .backgroundPalette('grey');
  }
}
Material.$inject = ['$mdThemingProvider'];
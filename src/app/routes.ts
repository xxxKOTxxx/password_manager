export class Routes {
  constructor(
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider
  ) {
    $routeProvider
      .when(
        "/",
        {
          templateUrl: "/templates/list.html",
          controller: "ListCtrl as list"
        }
      )
      .when(
        "/create/:label?",
        {
          templateUrl: "/templates/edit.html",
          controller: "EditCtrl as edit"
        }
      )
      .when(
        "/edit/:id",
        {
          templateUrl: "/templates/edit.html",
          controller: "EditCtrl as edit"
        }
      )
      .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({
      enabled: true
    });
  }
}
Routes.$inject = ['$routeProvider', '$locationProvider'];
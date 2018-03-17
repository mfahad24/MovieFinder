(function() {
  angular
    .module("myApp")
    .config(function($routeProvider) {
      $routeProvider
        .when("/list", {
          template: "<list-component></list-component>"
        })
        .when("/select", {
          template: "<select-component></select-component>"
        })
        .when("/form", {
          template: "<form-component></form-component>"
        })
        .when("/watch", {
          template: "<watch-component></watch-component>"
        })
        .when("/welcome", {
          template: "<welcome-component></welcome-component>"
        })
        .otherwise({
          redirectTo: "/welcome"
        });
    })
})();

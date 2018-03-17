(function() {
  var watchComponent = {
    templateUrl: `partials/watch.html`,
    controller: function(DetailService, $location) {
      $ctrl = this;
      $ctrl.movie = DetailService.setMovieDetails();
      //assigns details API object call made in detail service to $ctrl.movie variable to be used to display new properties in the watch partial

      $ctrl.goBack = function () {
        $location.path("/select");
      }
    }
  }
  angular
    .module("myApp")
    .component("watchComponent", watchComponent);

})();

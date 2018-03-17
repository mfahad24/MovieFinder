(function() {
  var listComponent = {
    templateUrl: `partials/list.html`,
    controller: function($timeout, ListService, DetailService, $location) {
      var $ctrl = this;
      $ctrl.movies = ListService.displayList(); 

      $ctrl.deleteFromList = function(index) {
        ListService.deleteFromList(index, 1)
      }
      $ctrl.checkDetails = function(movie) {
        DetailService.getMovieDetails(movie).then(function() {
          $location.path("/watch");
        })
      }
    }
  }

  angular
    .module("myApp")
    .component("listComponent", listComponent);

})();

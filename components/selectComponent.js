(function () {
  var selectComponent = {
    templateUrl: `partials/select.html`,
    controller: function ($timeout, MovieService, ListService, $location, DetailService) {
      var $ctrl = this;
      $ctrl.returned = MovieService.getParameters();

      //This saves the original search parameters so they can be called again if the listcheck conditionals are true.

      if (!($ctrl.returned)) {
        console.log("default search");
        $ctrl.returned = { minLength: 60, maxLength: 180, minYear: 1920, maxYear: 2018, pagenum: 1 };
        MovieService.getMovies($ctrl.returned).then(function () {
          MovieService.setParameters($ctrl.returned);
          $ctrl.movies = MovieService.getCurrentMovies();
          $ctrl.movies.forEach(function (movie) {
            movie.swipedLeft = false;
            movie.swipedRight = false;
          })

        });
      } else {
        console.log("specific search");
          $ctrl.movies = MovieService.getCurrentMovies();
          $ctrl.movies.forEach(function (movie) {
            movie.swipedLeft = false;
            movie.swipedRight = false;
          });
        }


      //This returns the first index of the movie object array returned from the API call

      $ctrl.saveToList = function () {
        ListService.saveToList($ctrl.movies[0]);
        $ctrl.nextMovie();
        //This function sets the movie object in the list service to be displayed later in the list component (watch later). It also calls the nextMovie function described below.
      }

      $ctrl.deleteMovie = function () {
        MovieService.nextMovie();
        $ctrl.movies = MovieService.getCurrentMovies();
        console.log($ctrl.movies);
      }

      $ctrl.nextMovie = function () {
        $ctrl.movies[0].swipedLeft = true;
        $timeout($ctrl.deleteMovie, 250);
        //Checks if movie array is below three, if it is, the pagenum property of returned(The original search params) is incremented and another call to the API is made to grab the second page of the original return.
        var listLength = MovieService.checkListLength();
        if (listLength < 5) {
          $ctrl.returned.pagenum++;
          MovieService.getMovies($ctrl.returned).then(function () {
            $ctrl.movies = MovieService.getCurrentMovies();
            $ctrl.movies.forEach(function (movie) {
              movie.swipedLeft = false;
              movie.swipedRight = false;
            });
        });
      } else if (listLength === 0){
        swal("Oh NO! No more MOvies ya Dumb bastard!")
      }
    }

      $ctrl.swipeRight = function () {
        $ctrl.movies[0].swipedRight = true;
        $timeout($ctrl.switchToWatch($ctrl.movies[0]), 500);
      }

      $ctrl.switchToWatch = function (movie) {
        DetailService.getMovieDetails(movie).then(function () {
          $location.path("/watch");
          //this function uses the movie object to make a separate API call for more details to be displayed in the watch component view. It also redirects you to said component. Because we're good like that
        });
      }

    }
  }




  angular
    .module("myApp")
    .component("selectComponent", selectComponent)
})();

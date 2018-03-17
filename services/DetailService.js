(function() {
  function DetailService($http) {
    var movieDetails;

    return {
      getMovieDetails: getMovieDetails,
      setMovieDetails: setMovieDetails

    }

    function getMovieDetails(movie) {
      var movieID = movie.id;
      //assigns the id property of movie object to a variable  to be used in the new details API call
      var baseUrl = "https://api.themoviedb.org/3/movie/"
      var urlsuffix = "?api_key=a420712cee91c2aec196fe700c0ceb35&append_to_response=credits"
      return $http({
        method: "GET",
        url: baseUrl + movieID + urlsuffix
      }).then(function(response) {
        movieDetails = response.data;
        movieDetails.credits.crew = movieDetails.credits.crew.filter(function (person) {
          return (person.job === "Director");
        });
        //assigns the response of the API call the the movieDetails variable
      });
    }

    function setMovieDetails() {
      return movieDetails;
      //returns API response through movieDetails variable
    }
  }

  angular
    .module("myApp")
    .factory("DetailService", DetailService);

})();

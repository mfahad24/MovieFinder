(function () {
  var formComponent = {
    templateUrl: `partials/form.html`,
    controller: function ($element, MovieService, $location, $scope) {
      var $ctrl = this;
      $ctrl.searchGenre = [];

      //this method gathers the form object onto the model//

      $ctrl.genres = [{
        name: "Action",
        id: "28",
        toggle: false
      },
      {
        name: "Adventure",
        id: "12",
        toggle: false
      },
      {
        name: "Animation",
        id: "16",
        toggle: false
      },
      {
        name: "Comedy",
        id: "35",
        toggle: false
      },
      {
        name: "Crime",
        id: "80",
        toggle: false
      },
      {
        name: "Documentary",
        id: "99",
        toggle: false
      },
      {
        name: "Drama",
        id: "18",
        toggle: false
      },
      {
        name: "Family",
        id: "10751",
        toggle: false
      },
      {
        name: "Fantasy",
        id: "14",
        toggle: false
      },
      {
        name: "History",
        id: "36",
        toggle: false
      },
      {
        name: "Horror",
        id: "27",
        toggle: false
      },
      {
        name: "Musicals",
        id: "10402",
        toggle: false
      },
      {
        name: "Romance",
        id: "10749",
        toggle: false
      },
      {
        name: "Science Fiction",
        id: "878",
        toggle: false
      },
      {
        name: "Thriller",
        id: "53",
        toggle: false
      },
      {
        name: "War",
        id: "10752",
        toggle: false
      },
      {
        name: "Western",
        id: "37",
        toggle: false
      }
      ];


      $ctrl.pickGenre = function (object) {
        object.toggle = !object.toggle;
        if ($ctrl.searchGenre.includes(object)) {
          $ctrl.searchGenre.splice($ctrl.searchGenre.indexOf(object), 1);
        } else {
          $ctrl.searchGenre.push(object);
        }
        console.log($ctrl.searchGenre);

      }
      //$ctrl.genres is the object containing our genres and their corresponding database ID's so we can pass to service//
      $ctrl.searchTerm;

      //clears search field once you click outside of the drop down//
      $ctrl.clearSearchTerm = function () {
        $ctrl.searchTerm = '';
      };
      $ctrl.form = {
        minLength: 60,
        maxLength: 180,
        minYear: 1900,
        maxYear: 2018
      };
      //This is the base line value for that sliders, that will change based on the rzslider high and rzslider model values//

      $ctrl.slider = {
        minValue: 60,
        maxValue: 180,
        options: {
          floor: 60,
          ceil: 180,
          step: 1,
          minRange: 0,
          maxRange: 180
        }
      };
        //The slider object with minValue and maxValue as expressions in the partial so that the slider can be moved between those values//

        $ctrl.yearSlider = {
        minValue: 1900,
        maxValue: 2018,
        options: {
          floor: 1900,
          ceil: 2018,
          step: 1
          }
        };


      $ctrl.getMovies = function (form) {
          console.log(form);
          form.pagenum = 1;
          //pagenum is added to the object so that it can correspond with the database through the service. Before every new GET this number is incremented by one so the next page of the database can be displayed//
          form.genre = $ctrl.searchGenre;
          console.log(form);
          MovieService.clearMovieList();
          //clears movieList object so no results of prior input sticks around when user puts in new info into form
          MovieService.getMovies(form).then(function () {
            $location.path("/select");
          });
          //this method grabs the search parameters and sets them in the service, then redirects you to the select component//
          MovieService.setParameters(form);
          //this method does almost the same as getMovies...It is set in the service and used later to make another call to the API with the updated pagenum//
        };

        $element.find('input').on('keydown', function (ev) {
          ev.stopPropagation();
          //stopPropagation allows the search field to be used...The default event for md-select cancels keydown events//
        })

        $ctrl.showGenres = function() {
          angular.element( document.querySelector( '.genreSelect' ) ).toggleClass("mobile-hidden animated bounceInDown");
        }

      }
    }

  angular
    .module("myApp")
        .component("formComponent", formComponent)
  })();

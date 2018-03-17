(function() {
  function ListService() {
    var laterList = [];
    //declares the empty later list which will have movie objects pushed to it if the saveToList function is called

    return {
      saveToList: saveToList,
      displayList: displayList,
      deleteFromList: deleteFromList
    }

    function saveToList(movie) {
      laterList.push(movie);
      //pushes movie object to the laterList
    }

    function deleteFromList(index) {
      laterList.splice(index, 1);
      //splices the first index of the movie object array if deleteFromList is called
    }

    function displayList() {
      return laterList;
      //returns the updated laterList
    }
  }

  angular
    .module("myApp")
    .factory("ListService", ListService);

})();

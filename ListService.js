(function () {
  function ListService() {
    var laterList = [];

    return {
      saveToList: saveToList,
      displayList: displayList,
      deleteFromList: deleteFromList
    }

    function saveToList(movie) {
      laterList.push(movie);
      console.log(laterList);
    }

    function deleteFromList(index) {
      laterList.splice(index, 1);
      // console.log(laterList);
    }

    function displayList() {
      return laterList;
    }

  }

  angular
    .module("myApp")
    .factory("ListService", ListService);

})();

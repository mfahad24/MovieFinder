(function() {
  var welcomeComponent = {
    template: `<div id="welcomediv" class="">
    <div id="whitediv">

      <form class="welcomeform">
        <h4 class="loginmsg">Please Login</h4>
        <input class="logininput" ng-model="$ctrl.login.username" id="name" placeholder="Username" />

        <input class="logininput" type="password" ng-model="$ctrl.login.password" id="password" placeholder="Password" />

        <button class="loginbtn" ng-click="$ctrl.checkLogin($ctrl.login)"type="submit">Sign In</button>
      </form>
      </div>
    </div>`,
    controller: function($location) {
      var $ctrl = this;
      $ctrl.user = {
        username: "GrantChirpus",
        password: "chirpus4ever"
      }

      $ctrl.checkLogin = function (login) {
        $ctrl.logininfo = login;
        // $ctrl.logininfo.username = "";
        // $ctrl.logininfo.password = "";
        console.log($ctrl.logininfo);
        if ($ctrl.logininfo.username === $ctrl.user.username && $ctrl.logininfo.password === $ctrl.user.password) {
          console.log("Hello")
          $location.path("/form")
        } else if ($ctrl.logininfo.username === "" && $ctrl.logininfo.password === "") {
          console.log("Hello");
          swal("Please enter a valid username and password");
        } else {
            swal("This username and password combination does not exist");
        }

      }

}
}
  angular
    .module("myApp")
    .component("welcomeComponent", welcomeComponent);

})();

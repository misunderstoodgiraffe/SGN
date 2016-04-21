// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('SGN.auth', [])
// need scope to pass in username/password to check db.
// need $window to set localstorage cookie
// need $location to redirect
// Auth is a factory function to handle authentication requests to the server.
.controller('AuthController', function($scope, $window, $location, Auth) {

})

.controller('AuthController', function($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.validUser = '';
  $scope.validPassword = '';

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.validate = function (string, option) {
    if (option === 'username') {
      if (string.length >= 1) {
        $scope.validUser = 'good username!'
      } else {
        $scope.validUser = 'Username must be greater than 1 character!'
      }
    } else if (option === 'password') {
      if (string.length > 5) {
        $scope.validPassword = 'good password!'
      } else {
        $scope.validPassword = 'Passwords must be greater than 5 characters!';
      } 

    }
  }
});

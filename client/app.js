angular.module('SGN', [
  'SGN.landing',
  'SGN.login',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './frontpage/landing.html',
      controller: 'LandingController'
    })
    .when('/home', {
      templateUrl: './client/home.html',
      controller: 'HomeController'
    })
});


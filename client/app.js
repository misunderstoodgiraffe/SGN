angular.module('SGN', [
  'SGN.users',
  'SGN.services',
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
  })
  // .otherwise({redirectTo: '/'});
});


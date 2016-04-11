angular.module('SGN', [
  'SGN.landing',
  'SGN.login',
  'SGN.dashboard',
  'SGN.profile',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './frontpage/landing.html',
      controller: 'LandingController'
    })
    .when('/home', {
      templateUrl: './dashboard/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/profile', {
      templateUrl: './profile/profile.html',
      controller: 'ProfileController'
    })
});


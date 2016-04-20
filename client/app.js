require('angular');
require('angular-route');
import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

angular.module('SGN', [
  'SGN.landing',
  'SGN.auth',
  'SGN.login',
  'SGN.aboutus',
  'SGN.dashboard',
  'SGN.profile',
  'SGN.updateProfile',
  'ngRoute',
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
    .when('/updateProfile', {
      templateUrl: './updateProfile/updateProfile.html',
      controller: 'UpdateProfileController'
    })
    .when('/profile', {
      templateUrl: './profile/profile.html',
      controller: 'ProfileController'
    })
    .when('/gamesProfile', {
      templateUrl: './profile/gamesProfile.html',
      controller: 'ProfileController'
    })
    .when('/aboutus',{
      templateUrl: './aboutus/aboutus.html',
      controller: 'AboutusController'
    })
});


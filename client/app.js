/* Import Dependencies*/
import angular from 'angular';
import 'angular-route';

/* Import Global Styles */
import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

/* Import App Controllers */
import './frontpage/LandingController';
import './aboutus/aboutusController';
import './auth/authController';
import './dashboard/dashboardController';
import './profile/profileController';
import './updateProfile/updateProfileController';
import './services';

/* Import App Templates */
import aboutUsTemplate from './aboutus/aboutus.html';
import dashboardTemplate from './dashboard/dashboard.html';
import landingTemplate from './frontpage/landing.html';
import profileTemplate from './profile/profile.html';
import gamesProfileTemplate from './profile/gamesProfile.html';
import updateProfileTemplate from './updateProfile/updateProfile.html';

/* Import App Template Styles */
import './aboutus/aboutus.css';
import './dashboard/dashboard.css';
import './frontpage/landing.css';
import './profile/profile.css';
import './updateProfile/updateProfile.css';

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
.config(($routeProvider) => {
  $routeProvider
    .when('/', {
      template: landingTemplate,
      controller: 'LandingController',
      controllerAs: 'LandingController',
    })
    .when('/home', {
      template: dashboardTemplate,
      controller: 'DashboardController',
      controllerAs: 'DashboardController',
    })
    .when('/updateProfile', {
      template: updateProfileTemplate,
      controller: 'UpdateProfileController',
      controllerAs: 'UpdateProfileController',
    })
    .when('/profile', {
      template: profileTemplate,
      controller: 'ProfileController',
      controllerAs: 'ProfileController',
    })
    .when('/gamesProfile', {
      template: gamesProfileTemplate,
      controller: 'ProfileController',
      controllerAs: 'ProfileController',
    })
    .when('/aboutus', {
      template: aboutUsTemplate,
      controller: 'AboutusController',
      controllerAs: 'AboutUsController',
    });
});

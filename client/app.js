/* Import Dependencies*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';


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
import './profilepanel/profilePanelController';
import './services';

/* Import App Templates */
import aboutUsTemplate from './aboutus/aboutus.html';
import dashboardTemplate from './dashboard/dashboard.html';
import landingTemplate from './frontpage/landing.html';
import profileTemplate from './profile/profile.html';
import gamesProfileTemplate from './profile/gamesProfile.html';
import updateProfileTemplate from './updateProfile/updateProfile.html';
import profilePanelTemplate from './profilepanel/profilePanel.html';

/* Import App Template Styles */
import './aboutus/aboutus.css';
import './dashboard/dashboard.css';
import './frontpage/landing.css';
import './profile/profile.css';
import './updateProfile/updateProfile.css';
import './profilepanel/profilePanel.css';


angular.module('SGN', [
  'SGN.landing',
  'SGN.auth',
  'SGN.login',
  'SGN.aboutus',
  'SGN.dashboard',
  'SGN.profile',
  'SGN.updateProfile',
  'SGN.profilePanel',
  uiRouter,
])
.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('landing', {
      url: '/',
      template: landingTemplate,
      controller: 'LandingController',
      controllerAs: 'LandingController',
    })
    .state('home', {
      url: '/home',
      template: profilePanelTemplate,
      controller: 'ProfilePanelController',
      controllerAs: 'ProfilePanelController',
    })
    .state('updateProfile', {
      url: '/friend.lastActivity',
      template: updateProfileTemplate,
      controller: 'UpdateProfileController',
      controllerAs: 'UpdateProfileController',
    })
    .state('profile', {
      url: '/profile',
      template: profileTemplate,
      controller: 'ProfileController',
      controllerAs: 'ProfileController',
    })
    .state('gamesProfile', {
      url: '/gamesProfile',
      template: gamesProfileTemplate,
      controller: 'ProfileController',
      controllerAs: 'ProfileController',
    })
    .state('aboutus', {
      url: '/about',
      template: aboutUsTemplate,
      controller: 'AboutusController',
      controllerAs: 'AboutUsController',
    });
}]);

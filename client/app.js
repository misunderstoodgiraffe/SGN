/* Import Dependencies*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';


/* Import Global Styles */
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';

/* Import App Controllers */
import './landingpage/landingController';
import './auth/authController';
import './dashboard/dashboardController';
import './profilepanel/profilePanelController';
import './navigation/navigationController';
import './friends/friendsController';
import './events/eventsController';

/* Import Shared Factories and Services */
import './services';

/* Import App Templates */
import dashboardTemplate from './dashboard/dashboard.html';
import landingTemplate from './landingpage/landing.html';
import profilePanelTemplate from './profilepanel/profilePanel.html';
import navigationTemplate from './navigation/navigation.html';
import friendsTemplate from './friends/friends.html';
import eventsTemplate from './events/events.html';

/* Import App Template Styles */
import './dashboard/dashboard.css';
import './landingpage/landing.css';
import './profilepanel/profilePanel.css';
import './navigation/navigation.css';
import './friends/friends.css';
import './events/events.css';


angular.module('CGN', [
  'CGN.landing',
  'CGN.auth',
  'CGN.dashboard',
  'CGN.profilePanel',
  'CGN.navigation',
  'CGN.events',
  'CGN.friends',
  uiRouter,
])
.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('landing', {
      url: '/',
      views: {
        '': {
          template: landingTemplate,
          controller: 'LandingController',
          controllerAs: 'LandingController',
        },
      },
    })
    .state('home', {
      url: '/home',
      views: {
        '': {
          template: landingTemplate,
          controller: 'LandingController',
          controllerAs: 'LandingController',
        },
      },
    })
    .state('friends', {
      url: '/friends',
      views: {
        '': {
          template: friendsTemplate,
          controller: 'FriendsController',
          controllerAs: 'FriendsController',
        },
        'navigation@': {
          template: navigationTemplate,
          controller: 'NavigationController',
          controllerAs: 'NavigationController',
        },
        'profilePanel@': {
          template: profilePanelTemplate,
          controller: 'ProfilePanelController',
          controllerAs: 'ProfilePanelController',
        },
      },
    })
    .state('events', {
      url: '/events',
      views: {
        '': {
          template: eventsTemplate,
          controller: 'EventsController',
          controllerAs: 'EventsController',
        },
        'navigation@': {
          template: navigationTemplate,
          controller: 'NavigationController',
          controllerAs: 'NavigationController',
        },
        'profilePanel@': {
          template: profilePanelTemplate,
          controller: 'ProfilePanelController',
          controllerAs: 'ProfilePanelController',
        },
      },
    })
    .state('dashboard', {
      url: '/dashboard',
      views: {
        '': {
          template: dashboardTemplate,
          controller: 'DashboardController',
          controllerAs: 'DashboardController',
        },
        'navigation@': {
          template: navigationTemplate,
          controller: 'NavigationController',
          controllerAs: 'NavigationController',
        },
        'profilePanel@': {
          template: profilePanelTemplate,
          controller: 'ProfilePanelController',
          controllerAs: 'ProfilePanelController',
        },
      },
    });
}]);

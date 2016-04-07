// Include OAuth.js in the <head> of your HTML,

// <script src="/path/to/oauth.js"></script>

// In your JavaScript, add this line to initialize OAuth.js

// OAuth.initialize('your_app_public_key');

SGN.factory('facebookService', function($q) {

  //Authentication result returned by facebook. Inclues an auth token
  var authorizationResult = false;
  var authtoken = false;

  return {
    initialize: function() {
      //initialize OAuth.io with public key of the application
      OAuth.initialize('BqQzmRHEA0gxZSaUVbqEaPmDyM8', {cache: true});
      //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
      authorizationResult = OAuth.create('facebook');
    },
    connectFacebook: function() {
      var deferred = $q.defer();
      OAuth.popup('facebook', {cache: true}, function(error, result) { //cache means to execute the callback if the tokens are already present
        if (!error) {
          authorizationResult = result;
          authtoken = result.access_token;
          deferred.resolve();
        } else {
          //do something if there's an error
          deffered.reject('error');
        }
      });
      return deferred.promise;
    },
    clearCache: function() {
      OAuth.clearCache('facebook');
      authorizationResult = false;
    },
    getFriends: function () {
      //create a deferred object using Angular's $q service
      var deferred = $q.defer();
      var promise = authorizationResult.get('/friendlists').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
          //when the data is retrieved resolved the deferred object
        deferred.resolve(data);
      });
      //return the promise of the deferred object
      return deferred.promise;
    }
  };
    
});
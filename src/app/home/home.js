/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.state',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})



.factory('getJSONData', function ($http) {
  var getJSONData = {
    async: function(path, parms) {
      var promise = $http.jsonp(path, {params: parms}).then(function (response) {
        return response.data;
      });
      return promise;
    }
  };
  return getJSONData;
})
/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( getJSONData, $scope) {
  $scope.search = {name: ""};

  var basepath = 'https://api.themoviedb.org/3/';
  var api_key_string = '1d1797f948616477d9cb0671d7a280c8';
  var callback_string = 'JSON_CALLBACK';

  $scope.searchName = function(searchString) {
      var path = basepath + 'search/person';
      var parameters = {
        api_key: api_key_string,
        query: searchString,
        callback: callback_string
      };
      getJSONData.async(path, parameters).then(function(d) {
          $scope.data = d;
      });
  };

  $scope.getActorDetails = function(actorId) {
    var path = basepath + 'person/' + actorId;
    var parameters = {
      api_key: api_key_string,
      callback: callback_string
    };
    getJSONData.async(path, parameters).then(function(d) {
      $scope.persondata = d;
    });
  };
})
;


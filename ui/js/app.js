var app = angular.module('app', [
  'ngRoute', 'ngCookies','controllers', 'services'
]);

app.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
      templateUrl: 'views/contacts/search.html',
      controller: 'ContactCtrl',
      title: "Contacts"
    }).
  	when('/contact', {
      templateUrl: 'views/contacts/index.html',
      controller: 'ContactCtrl',
      title: "New Contact"
    }).
    when('/contact/:id', {
      templateUrl: 'views/contacts/index.html',
      controller: 'ContactCtrl',
      title: "New Contact"
    }).
    when('/static/not-found', {
      templateUrl: 'views/static/not-found.html',
      controller: 'StaticCtrl',
      title: "Page Not Found"
    }).
    otherwise({
      redirectTo: '/static/not-found'
    });
}]);

//http://stackoverflow.com/a/15267754
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
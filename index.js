var app = angular.module('phpAngular',['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './views/main/main.html',
    controller: 'MainController'
  });
});
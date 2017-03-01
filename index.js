var app = angular.module('phpAngular',['ngRoute','angularCSS']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: './views/intro/intro.html',
    controller: 'MainController',
  })
  .when('/main', {
    templateUrl: './views/main/main.html',
    controller: 'MainController',
    css : './css/style.css'
  });
});
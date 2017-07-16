angular.module('myApp',[
    'ngRoute','ngAnimate','ui.bootstrap', 'controllers', 'myFilters',
    'myServices', 'myDirectives','ngMessages' ])

   .config(function($routeProvider){
    $routeProvider.when('/home',{
	   templateUrl:'pages/home.html',
	   reloadOnSearch: true,
	   controller:'UserController'
    })
    .when('/aboutus',{
	   templateUrl:'pages/aboutus.html',
	   reloadOnSearch: true,
	   controller:'UserController'
    })
    .otherwise({
        redirectTo:'/home'
    })
})
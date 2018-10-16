"use strict"
var myHomeApp = angular.module('homeApp',['ngRoute', 'userApp']);
myHomeApp.config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl : '/template/homePage/home.html',
        controller : 'homeCtrl'
    })
}]);
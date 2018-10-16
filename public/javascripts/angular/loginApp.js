"use strict"
var myLoginApp = angular.module('loginApp',['ngRoute', 'userApp']);
myLoginApp.config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl : '/template/login/login.html',
        controller : 'loginCtrl'
    })
    $routeProvider.when('/register', {
        templateUrl : '/template/login/register.html',
        controller : 'loginCtrl'
        })
}]);

myLoginApp.run(function (messageService) {
    messageService.setMessages();
})



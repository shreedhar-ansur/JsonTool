"use strict"
var myUserApp = angular.module('userApp',['ngRoute']);

myUserApp.factory('userDetails', function () {
    var user = {
        name : '',
        password : '',
        secretCode : '',
        email : '',
        active : false,
        logedin : false
    };

    return {
        'getUser' : function () {
            return user;
        },
        'setUserAttr' : function (attrKey, attrValue) {
            user['attrKey'] = attrValue;
        },
        /*'setUser' : function (name, password, secretcode, active, logedin, email) {
            user.name = name;
            user.password = password;
            user.secretCode = secretcode;
            user.active = active;
            user.logedin = logedin;
            user.email = email;
        },*/
        'setUser' : function (userIn) {
            user = userIn;
        },
        'getAttr' : function (attrKey) {
            return user['attrKey'];
        }
    };
})
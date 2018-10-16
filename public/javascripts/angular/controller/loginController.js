
myLoginApp.controller('loginCtrl',['$scope','$http','userDetails','$location','$window','messages','userDetails','$sce',
    function (scope, http, user, location, window, messages, userDetails, $sce) {

    var messagesJson = messages.getMsg();
    scope.login = function () {
        var validForm = validateLogin(scope);
        if(validForm) {
            userDetails.setUser(scope.user);
            var user = userDetails.getUser();
            http.post('/login/login',JSON.stringify(user)).then(loginSuccess, loginFailure);
        }
    }
    scope.register = function () {
        location.path('/register');
    }
    scope.registerUser = function () {
        var validForm = validateRegistration(scope);
        if(validForm) {
            userDetails.setUser(scope.user);
            var user = userDetails.getUser();
            http.post('/login/registerUser',user).then(registerSuccess, registerFailure);
        }
    }
    scope.cancel = function () {
        location.path('/');
    }

    var loginSuccess = function (response) {
        var user = response.data.user;
        console.log(response.data);
        if(response.data.result === 'true' || response.data.result === true) {
            userDetails.setUserAttr('name',user.name);
            userDetails.setUserAttr('password',user.pass);
            userDetails.setUserAttr('email',user.email);
            userDetails.setUserAttr('active',user.active);
            userDetails.setUserAttr('logedin',true);
            window.location.href = '/homePage/home/';
        }
        else {
            scope.error = true;
            var errorMessage = messagesJson.LOGIN_INVALID_USERNAME_PASSWORD;
            scope.errorMsg = $sce.trustAsHtml(errorMessage);
        }
    }

    var loginFailure = function (data) {
        console.log('login Failure');
    }

    var registerSuccess = function (response) {
        var res = response.data.result;
        console.log(res);
        if(res === "true" || res === true) {
            window.location.href = '/';
        } else {
        }
    }

    var registerFailure = function (data) {
    }

    var validateLogin = function (scope) {
        var res = true;
        var errorMessage = '';
        if(scope.user != undefined && scope.user != null &&
            scope.user.name != undefined && scope.user.password != undefined &&
            scope.user.name != null && scope.user.password != null &&
            scope.user.name != '' && scope.user.password != '') {

        } else {
            errorMessage = messagesJson.REGISTRATION_INVALID_DETAILS;
            res = false;
        };

        if(res === false) {
            scope.error = true;
            scope.errorMsg = $sce.trustAsHtml(errorMessage);
        }
        return res;
    }

    var validateRegistration = function (scope) {
        var res = true;
        var errorMessage = '';
        if(scope.user != undefined && scope.user != null &&
            scope.user.name != undefined && scope.user.password != undefined && scope.user.secretCode != undefined && scope.user.email != undefined &&
                scope.user.name != null && scope.user.password != null && scope.user.secretCode != null && scope.user.email != null &&
                    scope.user.name != '' && scope.user.password != '' && scope.user.secretCode != '' && scope.user.email != '') {
            scope.username_error = "";
            scope.secretcode_error = "";
            scope.email_error = "";
            scope.password_error = "";
            scope.passwordmatch_error = "";
            if(!validateUserName(scope.user.name)) {
                res = false;
                scope.username_error = $sce.trustAsHtml(messagesJson.REGISTRATION_INVALID_USERNAME);
            }
            if(!validateSecretCode(scope.user.secretCode)) {
                res = false;
                scope.secretcode_error = $sce.trustAsHtml(messagesJson.REGISTRATION_INVALID_SECRETCODE);
            }
            if(!validateEmail(scope.user.email)) {
                res = false;
                scope.email_error = $sce.trustAsHtml(messagesJson.REGISTRATION_INVALID_EMAIL);
            }
            if(!validatePassword(scope.user.password)) {
                res = false;
                scope.password_error = $sce.trustAsHtml(messagesJson.REGISTRATION_INVALID_PASSWORD);
            }
            if(!validateConfirmPassword(scope.user.password, scope.user.confirmPassword)) {
                res = false;
                scope.passwordmatch_error = $sce.trustAsHtml(messagesJson.REGISTRATION_INVALID_PASSWORD_MATCH);
            }
        }
        else {
            errorMessage = messagesJson.REGISTRATION_INVALID_DETAILS;
            res = false;
        }

        if(res === false) {
            scope.error = true;
            scope.errorMsg = $sce.trustAsHtml(errorMessage);
        }
        return res;
    };
    
    var validateUserName = function (name) {
        var res = false;
        var UserNameRegEx = new RegExp("[^a-zA-Z0-9_]");
        if(!UserNameRegEx.test(name)) {
            res = true;
        }
        return res;
    }
    
    var validateSecretCode = function (secretCode) {
        var res = false;
        if(secretCode == 'shreedhar') {
            res = true;
        }
        return res;
    };

    var validateEmail = function(email) {
        var res = false;
        /*var emailPattern = new RegExp('[^a-zA-Z0-9_]');
        if(!emailPattern.test(email)) {
            res = true;
        }*/
        return !res;
    }
    
    var validatePassword = function (pass) {
        var res = false;
        var passPattern = new RegExp('[^a-zA-Z0-9_@#$&_^=]+');
        if(!passPattern.test(pass)) {
            res = true;
        }
        return res;
    }
    
    var validateConfirmPassword = function (pass1,pass2) {
        var res = false;
        if(pass1 === pass2) {
            res = true;
        }
        return res;
    }

}]);
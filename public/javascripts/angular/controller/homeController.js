
myHomeApp.controller('homeCtrl',['$scope','$http','userDetails','$window', function (scope, http, user, window) {

    scope.user = user.getUser();
    http.get('/homePage/modifyXml').then(modificationSuccess, modificationFailure);

    var modificationSuccess = function () {
        console.log("success");
    }

    var modificationFailure = function () {
        console.log("failure");
    }

}]);
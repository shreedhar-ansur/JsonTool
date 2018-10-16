myLoginApp.service('messageService', function ($window, $http, messages) {
    this.getLocale = function () {
        var lang = $window.navigator.language || $window.navigator.userLanguage;
        return lang.split('-')[0];
    };
    this.setMessages = function () {
        $http.get('messages/message_'+this.getLocale()+'.json').success( function (data) {
            messages.setMsg(data);
        });
    };
});
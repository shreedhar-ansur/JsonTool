myLoginApp.factory('messages', function () {
    var msg = {};
    return {
        'setMsg' : function (data) {
            msg = data;
        },
        'getMsg' : function () {
            return msg;
        }
    }
});
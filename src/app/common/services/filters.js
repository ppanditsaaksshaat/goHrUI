
angular.module('BlurAdmin.common').filter('findObj', function () {
    return function (list, value, propName) {
        var i = 0, len = list.length;
        for (; i < len; i++) {
            if (list[i][propName] == value) {
                return list[i];
            }
        }
        return null;
    }
})
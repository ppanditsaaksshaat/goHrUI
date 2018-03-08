
angular.module('BlurAdmin.common').filter('findObj', function () {
    return function (list, value, propName) {
        var i = 0, len = list.length;
        for (; i < len; i++) {
            if (list[i][propName] == value) {
                list[i].index = i;
                return list[i];
            }
        }
        return null;
    }
}).filter('findAll', function () {
    return function (list, value, propName) {
        var result = []
        var i = 0, len = list.length;
        for (; i < len; i++) {
            if (list[i][propName] == value) {
                list[i].index = i;
                result.push(list[i]);
            }
        }
        if (result.length > 0) {
            return result;
        }
        else {
            return null;
        }

    }
}).filter('mapGender', function () {
    var genderHash = {
        1: 'male',
        2: 'female'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return genderHash[input];
        }
    };
}).filter('mapStatus', function () {
    var genderHash = {
        1: 'Bachelor',
        2: 'Nubile',
        3: 'Married'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return genderHash[input];
        }
    };
}).filter('mapDropdown', function () {
    return function (input, map, idField, valueField) {
        if (map) {
            for (var i = 0; i < map.length; i++) {
                if (input == -2) {
                    return "";
                }
                if (map[i][idField] == input) {
                    return map[i][valueField];
                }
            }
        }
        return '';
    };
}).filter('mapMultiDropdown', function () {

    return function (input, map, idField, valueField) {

        if (input.length) {
            var valueReturn = '';
            for (var i = 0; i < input.length; i++) {
                valueReturn += input[i][valueField] + ', ';
            }
            if (valueReturn.length > 2) {
                valueReturn = valueReturn.substr(0, valueReturn.length - 1)
            }


            return valueReturn;
        }
        // if (map) {
        //     for (var i = 0; i < map.length; i++) {
        //         if (map[i][idField] == input[idField]) {
        //             return map[i][valueField];
        //         }
        //     }
        // }
        return '';
    };
})
    .filter('mapSalaryHead', function () {
        var currencyMap = {
            'dollar': '$',
            'pound': '£',
            'euro': '€'
        };

        return function (value, scope) {
            console.log(value, scope)
            return '';//  currencyMap[scope.row.entity.currency] + value.toFixed(2);
        };
    }).filter('percentage', function () {
        return function (value) {
            var val = parseFloat(value)
            if (isNaN(val)) {
                return ''
            }
            return val.toFixed(2) + " %";
        };
    }).filter('2decimal', function () {
        return function (value) {
            var val = parseFloat(value)
            if (isNaN(val)) {
                return ''
            }
            return val.toFixed(2);
        };
    }).filter('avoidNan', function () {
        return function (value) {
            var val = parseFloat(value)
            if (isNaN(val)) {
                return '0.00'
            }
            return val.toFixed(2);
        };
    }).filter('avoidNone', function () {
        return function () {
            return function (value) {
                if (value == -2) {
                    return ''
                }
                return value;
            };
        }
    }).filter('range', function() {
        return function(input, total) {
          total = parseInt(total);
      
          for (var i=0; i<total; i++) {
            input.push(i);
          }
      
          return input;
        };
    })
    